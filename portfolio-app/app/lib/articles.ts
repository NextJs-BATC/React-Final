import { sql } from "./db";

export type Article = {
	id: string;
	title: string;
	slug: string;
	content: string;
	created_at: string;
};

export async function fetchArticles() {
	try {
		const articles = await sql<Article[]>`
      SELECT *
      FROM articles
      ORDER BY created_at DESC
    `;

		return articles;
	} catch (error) {
		console.error("Failed to fetch articles:", error);
		throw new Error("Failed to fetch articles");
	}
}

export async function fetchArticleBySlug(slug: string) {
	try {
		const article = await sql<Article[]>`
      SELECT *
      FROM articles
      WHERE slug = ${slug}
      LIMIT 1
    `;

		return article[0] ?? null;
	} catch (error) {
		console.error("Failed to fetch article:", error);
		throw new Error("Failed to fetch article");
	}
}
