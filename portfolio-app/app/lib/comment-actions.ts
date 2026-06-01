"use server";

import { sql } from "./db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createComment(formData: FormData) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	const articleId = Number(formData.get("article_id"));
	const slug = String(formData.get("slug"));
	const content = String(formData.get("content"));

	try {
		await sql`
			INSERT INTO comments (article_id, user_id, content)
			VALUES (${articleId}, ${session.user.id}, ${content})
		`;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to create comment");
	}

	revalidatePath("/articles");
	revalidatePath(`/articles/${slug}`);
	redirect(`/articles/${slug}`);
}

export async function deleteComment(commentId: string, slug: string) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	try {
		await sql`
			DELETE FROM comments
			WHERE id = ${commentId}
			AND user_id = ${session.user.id}
		`;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to delete comment");
	}

	revalidatePath(`/articles/${slug}`);
}
