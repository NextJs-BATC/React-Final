"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.currentTarget);

		const res = await fetch("/api/register", {
			method: "POST",
			body: JSON.stringify({
				name: formData.get("name"),
				email: formData.get("email"),
				password: formData.get("password"),
			}),
		});

		if (res.ok) {
			await signIn("credentials", {
				email: String(formData.get("email")),
				password: String(formData.get("password")),
				callbackUrl: "/dashboard",
			});
		}

		setLoading(false);
	}

	return (
		<div className="max-w-md mx-auto p-6">
			<h1 className="text-2xl font-bold mb-4">Register</h1>

			<form onSubmit={handleSubmit} className="space-y-3">
				<input name="name" placeholder="Name" className="w-full border p-2" />
				<input name="email" placeholder="Email" className="w-full border p-2" />
				<input
					name="password"
					type="password"
					placeholder="Password"
					className="w-full border p-2"
				/>

				<button className="bg-green-500 text-white px-4 py-2 rounded">
					{loading ? "Creating..." : "Create Account"}
				</button>
			</form>
		</div>
	);
}
