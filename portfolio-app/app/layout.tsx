"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "@/app/ui/navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-zinc-50 dark:bg-black text-black dark:text-white">
				<SessionProvider>
					<Navbar />
					<main className="max-w-5xl mx-auto px-6 py-6">{children}</main>
				</SessionProvider>
			</body>
		</html>
	);
}
