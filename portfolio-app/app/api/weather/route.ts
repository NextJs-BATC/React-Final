import { fetchWeather } from "@/app/lib/weather";

export async function GET() {
	try {
		const weather = await fetchWeather();

		return Response.json({
			name: weather.name,
			temperature: weather.temperature,
			detailedForecast: weather.detailedForecast,
		});
	} catch (error) {
		return new Response("Failed to fetch weather", { status: 500 });
	}
}
