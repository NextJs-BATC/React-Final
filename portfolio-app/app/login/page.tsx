"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		await signIn("credentials", {
			email: formData.get("email"),
			password: formData.get("password"),
			callbackUrl: "/dashboard",
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<input name="email" />

			<input name="password" type="password" />

			<button>Login</button>
		</form>
	);
}
