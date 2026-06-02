"use client";

import Link from "next/link";
import { useWeather } from "@/app/hooks/useWeather";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
	const { weather, loading } = useWeather();
	const { data: session } = useSession();

	return (
		<nav className="w-full flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-black">
			{/* Left */}
			<div className="font-bold text-lg">Portfolio</div>

			{/* Center links */}
			<div className="flex gap-6 text-sm">
				<Link href="/">Home</Link>
				<Link href="/articles">Articles</Link>
				<Link href="/contact">Contact</Link>

				{session && <Link href="/dashboard">Dashboard</Link>}
			</div>

			{/* Right */}
			<div className="flex items-center gap-4 text-sm text-gray-600">
				<div>
					{loading
						? "Loading weather..."
						: weather
							? `${weather.name}: ${weather.temperature}°F`
							: "Weather unavailable"}
				</div>

				{session ? (
					<button
						onClick={() => signOut({ callbackUrl: "/login" })}
						className="rounded bg-red-500 px-3 py-1 text-white"
					>
						Logout
					</button>
				) : (
					<div>
						<Link href="/login" className="text-blue-600">
							Login
						</Link>
						<br />
						<Link href="/register" className="text-blue-600">
							Register
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
}
