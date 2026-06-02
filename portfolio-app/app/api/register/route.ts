import { sql } from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
	try {
		const { name, email, password } = await req.json();

		const hashedPassword = await bcrypt.hash(password, 10);

		await sql`
			INSERT INTO users (name, email, password)
			VALUES (${name}, ${email}, ${hashedPassword})
		`;

		return Response.json({ success: true });
	} catch (err) {
		console.error(err);
		return new Response("Error creating user", { status: 500 });
	}
}
