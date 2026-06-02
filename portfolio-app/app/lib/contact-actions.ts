"use server";

import { sql } from "./db";
import { redirect } from "next/navigation";

export async function createInquiry(formData: FormData) {
	const name = String(formData.get("name"));
	const email = String(formData.get("email"));
	const message = String(formData.get("message"));

	try {
		await sql`
			INSERT INTO inquiries (
				name,
				email,
				message
			)
			VALUES (
				${name},
				${email},
				${message}
			)
		`;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to submit inquiry");
	}

	redirect("/contact?success=true");
}
