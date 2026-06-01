"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		await signIn("credentials", {
			email: String(formData.get("email")),
			password: String(formData.get("password")),
			callbackUrl: "/dashboard",
		});
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			<input name="email" placeholder="email" />
			<input name="password" type="password" placeholder="password" />

			<button type="submit">Login</button>
		</form>
	);
}
