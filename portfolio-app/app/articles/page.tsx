import Link from "next/link";
import { sql } from "@/app/lib/db";

export default async function ArticlesPage() {
	const articles = await sql`
		SELECT id, title, slug
		FROM articles
		ORDER BY id DESC
	`;

	return (
		<main className="max-w-3xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6">Articles</h1>

			<div className="space-y-4">
				{articles.map((article) => (
					<Link
						key={article.id}
						href={`/articles/${article.slug}`}
						className="block p-4 border rounded hover:bg-gray-50 transition"
						prefetch
					>
						<h2 className="text-xl font-semibold">{article.title}</h2>

						<p className="text-sm text-gray-500">Read article →</p>
					</Link>
				))}
			</div>
		</main>
	);
}
