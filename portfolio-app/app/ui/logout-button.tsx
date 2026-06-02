"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
	const [loading, setLoading] = useState(false);

	return (
		<button
			disabled={loading}
			onClick={async () => {
				setLoading(true);
				await signOut({ callbackUrl: "/login" });
			}}
			className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-50"
		>
			{loading ? "Logging out..." : "Logout"}
		</button>
	);
}
