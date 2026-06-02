"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const error = searchParams.get("error");

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const res = await signIn("credentials", {
			email: String(formData.get("email")),
			password: String(formData.get("password")),
			redirect: false, // 👈 IMPORTANT
		});

		// If login failed → send back to login page with error flag
		if (res?.error) {
			router.push("/login?error=1");
			return;
		}

		// If success → go to dashboard
		router.push("/dashboard");
	}

	return (
		<div className="max-w-sm mx-auto mt-20 space-y-4">
			<form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded">
				<input name="email" placeholder="email" className="w-full border p-2 rounded" />

				<input
					name="password"
					type="password"
					placeholder="password"
					className="w-full border p-2 rounded"
				/>

				{error && <p className="text-red-500 text-sm">Invalid email or password</p>}

				<button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
					Login
				</button>
			</form>

			<div className="flex justify-between text-sm">
				<Link href="/" className="text-gray-500 hover:underline">
					← Home
				</Link>
			</div>
		</div>
	);
}
