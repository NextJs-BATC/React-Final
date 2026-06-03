"use server";

import { sql } from "./db";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export async function createInquiry(formData: FormData) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	const recipientId = String(formData.get("recipient_id"));
	const subject = String(formData.get("subject"));
	const content = String(formData.get("content"));

	const threadId = crypto.randomUUID();

	await sql`
	INSERT INTO messages (
		sender_id,
		recipient_id,
		subject,
		content,
		thread_id
	)
	VALUES (
		${session.user.id},
		${recipientId},
		${subject},
		${content},
		${threadId}
	)
`;

	redirect("/contact?success=true");
}

export async function sendReply(
	recipientId: string,
	subject: string,
	threadId: string,
	formData: FormData,
) {
	const session = await auth();

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	const content = String(formData.get("content"));

	await sql`
	INSERT INTO messages (
		sender_id,
		recipient_id,
		subject,
		content,
		thread_id
	)
	VALUES (
		${session.user.id},
		${recipientId},
		${subject},
		${content},
		${threadId}
	)
`;

	redirect("/dashboard?reply=sent");
}
