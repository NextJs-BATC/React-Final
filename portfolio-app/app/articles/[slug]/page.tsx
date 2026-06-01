import { fetchArticleBySlug } from "@/app/lib/articles";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
	const article = await fetchArticleBySlug(params.slug);

	if (!article) {
		notFound();
	}

	return (
		<main className="p-6 max-w-3xl mx-auto">
			<h1 className="text-3xl font-bold">{article.title}</h1>

			<p className="mt-6 text-gray-700 leading-relaxed">{article.content}</p>
		</main>
	);
}
