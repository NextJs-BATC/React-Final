"use client";

import { useWeather } from "@/app/hooks/useWeather";

export default function Navbar() {
	const { weather, loading } = useWeather();

	return (
		<nav className="w-full flex items-center justify-between p-4 border-b">
			<div className="font-bold">Portfolio</div>

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
