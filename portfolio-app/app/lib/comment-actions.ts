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
	const slug = String(formData.get("slug"));
	const content = String(formData.get("content"));

	await sql`
		INSERT INTO comments (article_id, user_id, content)
		VALUES (${articleId}, ${session.user.id}, ${content})
	`;

	revalidatePath(`/articles`);
	revalidatePath(`/articles/${slug}`);
}

export async function deleteComment(commentId: string) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	await sql`
		DELETE FROM comments
		WHERE id = ${commentId}
		AND user_id = ${session.user.id}
	`;

	revalidatePath("/articles");
}

export async function updateComment(commentId: string, formData: FormData) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	const content = String(formData.get("content"));

	await sql`
		UPDATE comments
		SET content = ${content}
		WHERE id = ${commentId}
		AND user_id = ${session.user.id}
	`;

	revalidatePath("/articles");
}
