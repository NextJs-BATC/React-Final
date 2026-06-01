"use server";

import { sql } from "./db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createComment(formData: FormData) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	const articleId = String(formData.get("article_id"));
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

	revalidatePath(`/articles`);
}

export async function deleteComment(commentId: string) {
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

	revalidatePath(`/articles`);
}
