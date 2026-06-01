"use client";

import { useEffect, useState } from "react";

type Weather = {
	name: string;
	temperature: number;
	detailedForecast: string;
};

export function useWeather() {
	const [weather, setWeather] = useState<Weather | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadWeather() {
			try {
				setLoading(true);

				const res = await fetch("/api/weather");
				const data = await res.json();

				setWeather(data);
			} catch (err) {
				setError("Failed to load weather");
			} finally {
				setLoading(false);
			}
		}

		loadWeather();
	}, []);

	return { weather, loading, error };
}
