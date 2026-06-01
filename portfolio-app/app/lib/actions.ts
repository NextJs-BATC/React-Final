"use server";

import bcrypt from "bcrypt";
import { sql } from "./db";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
	try {
		const name = String(formData.get("name"));
		const email = String(formData.get("email"));
		const password = String(formData.get("password"));

		const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

		if (existingUser.length > 0) {
			throw new Error("User already exists");
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to register user");
	}

	redirect("/login");
}
