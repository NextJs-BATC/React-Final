import { sql } from "@/app/lib/db";
import { auth } from "@/auth";
import { createComment, deleteComment } from "@/app/lib/comment-actions";

type Comment = {
	id: string;
	article_id: string;
	user_id: string;
	content: string;
	created_at?: string;
};

export default async function ArticlePage({ params }: { params: { slug: string } }) {
	const session = await auth();

	const articles = await sql`
		SELECT *
		FROM articles
		WHERE slug = ${params.slug}
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

	const comments: Comment[] = await sql`
	SELECT *
	FROM comments
	WHERE article_id = ${article.id}
	ORDER BY id DESC
`;

	return (
		<main className="max-w-3xl mx-auto p-6">
			<h1 className="text-3xl font-bold">{article.title}</h1>

			<article className="mt-6 text-gray-700 leading-relaxed">{article.content}</article>

			<hr className="my-8" />

			<h2 className="text-xl font-semibold mb-4">Comments</h2>

			{/* CREATE COMMENT */}
			{session?.user && (
				<form action={createComment} className="space-y-2 mb-6">
					<input type="hidden" name="article_id" value={article.id} />
					<input type="hidden" name="slug" value={article.slug} />

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

			{/* COMMENT LIST */}
			<div className="space-y-4">
				{comments.map((comment) => (
					<div key={comment.id} className="border p-3 rounded">
						<p>{comment.content}</p>

						{session?.user?.id === comment.user_id && (
							<form action={deleteComment.bind(null, comment.id, article.slug)}>
								<button className="text-red-500 text-sm mt-2">Delete</button>
							</form>
						)}
					</div>
				))}
			</div>
		</main>
	);
}
