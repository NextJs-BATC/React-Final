export async function fetchWeather() {
	const res = await fetch("https://api.weather.gov/gridpoints/SLC/107,103/forecast");

	if (!res.ok) {
		throw new Error("Failed to fetch weather");
	}

	const data = await res.json();

	return data.properties.periods[0]; // current forecast
}
