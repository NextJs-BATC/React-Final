import Link from "next/link";
import { fetchArticles } from "@/app/lib/articles";

export default async function ArticlesPage() {
	const articles = await fetchArticles();

	return (
		<main className="p-6">
			<h1 className="mb-6 text-3xl font-bold">Articles</h1>

			<div className="grid gap-4">
				{articles.map((article) => (
					<Link
						key={article.id}
						href={`/articles/${article.slug}`}
						className="rounded-lg border p-4 transition hover:shadow-md"
					>
						<h2 className="text-xl font-semibold">{article.title}</h2>
						<p className="mt-2 text-sm text-gray-500 line-clamp-2">{article.content}</p>
					</Link>
				))}
			</div>
		</main>
	);
}
