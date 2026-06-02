"use client";

import Link from "next/link";
import { useWeather } from "@/app/hooks/useWeather";

export default function Navbar() {
	const { weather, loading } = useWeather();

	return (
		<nav className="w-full flex items-center justify-between p-4 border-b">
			<div className="font-bold">Portfolio</div>

			<div className="flex gap-4">
				<Link href="/">Home</Link>
				<Link href="/articles">Articles</Link>
				<Link href="/contact">Contact</Link>
			</div>

			<div className="text-sm text-gray-600">
				{loading
					? "Loading weather..."
					: weather
						? `${weather.name}: ${weather.temperature}°F`
						: "Weather unavailable"}
			</div>
		</nav>
	);
}
