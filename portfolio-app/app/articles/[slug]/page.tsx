import { sql } from "@/app/lib/db";
import { auth } from "@/auth";
import { createComment, deleteComment, updateComment } from "@/app/lib/comment-actions";
import CommentItem from "@/app/ui/comment-item";

type Comment = {
	id: string;
	article_id: string;
	user_id: string;
	content: string;
	created_at: string;
	user_name: string | null;
};

export default async function ArticlePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const session = await auth();

	const articles = await sql`
		SELECT *
		FROM articles
		WHERE slug = ${slug}
		LIMIT 1
	`;

	const article = articles[0];

	if (!article) {
		return (
			<main className="p-6">
				<h1 className="text-2xl font-bold">Article not found</h1>
			</main>
		);
	}

	const comments = (await sql`
	SELECT 
		comments.id,
		comments.article_id,
		comments.user_id,
		comments.content,
		comments.created_at,
		users.name as user_name
	FROM comments
	LEFT JOIN users ON users.id = comments.user_id
	WHERE comments.article_id = ${article.id}
	ORDER BY comments.id DESC
`) as Comment[];

	return (
		<main className="max-w-3xl mx-auto p-6">
			<h1 className="text-3xl font-bold">{article.title}</h1>

			<article className="mt-6 text-gray-700 leading-relaxed">{article.content}</article>

			<hr className="my-8" />

			<h2 className="text-xl font-semibold mb-4">Comments</h2>

			{session?.user && (
				<form action={createComment} className="space-y-2 mb-6">
					<input type="hidden" name="article_id" value={article.id} />
					<input type="hidden" name="slug" value={slug} />

					<textarea
						name="content"
						placeholder="Write a comment..."
						className="w-full border p-2"
					/>

					<button className="bg-blue-500 text-white px-4 py-2 rounded">
						Post Comment
					</button>
				</form>
			)}

			<div className="space-y-4">
				{comments.map((comment) => (
					<CommentItem
						key={comment.id}
						comment={comment}
						isOwner={session?.user?.id === comment.user_id}
						userName={comment.user_name}
						createdAt={comment.created_at}
					/>
				))}
			</div>
		</main>
	);
}
