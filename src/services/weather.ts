import type { Coordinates, WeatherData } from "../../types/weather/types.js";
import { z } from "zod";

const weatherSchema = z.object({
  time: z.string(),
  interval: z.number(),
  temperature_2m: z.number(),
  relative_humidity_2m: z.number(),
  is_day: z.number(),
  wind_speed_10m: z.number(),
  weather_code: z.number(),
});

/**
 * Responsibility:
 * 1. Acts as the service layer between the hook and the weather API.
 * 2. Fetches weather data from the weather API.
 * 3. Adapts weather data to the app's expected data format.
 */
export async function getWeather(
  { latitude, longitude }: Coordinates,
  temperatureUnit: string,
  speedUnit: string,
  externalSignal?: AbortSignal,
) {
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,weather_code&timezone=America%2FLos_Angeles`;

  // default values like celsius and kmh don't need the string fields
  if (temperatureUnit != "celsius") {
    url += `&temperature_unit=${temperatureUnit}`;
  }

  if (speedUnit != "kmh") {
    url += `&wind_speed_unit=${speedUnit}`;
  }

  const timeoutController = new AbortController();

  const timer = setInterval(() => {
    timeoutController.abort();
  }, 10000);

  const signals = [timeoutController.signal, externalSignal].filter(
    (signal): signal is AbortSignal => signal !== undefined,
  );
  const combinedSignal = AbortSignal.any(signals);

  try {
    const response = await fetch(url, { signal: combinedSignal });

    if (!response.ok) {
      console.error("Weather API Request Failed: ", response.status);
      throw new Error(
        `Something went wrong when trying reaching weather server. Please try again later.`,
      );
    }

    const result = await response.json();

    const weatherData = weatherSchema.parse(result.current);

    return {
      time: weatherData.time,
      interval: weatherData.interval,
      temperature: weatherData.temperature_2m,
      relative_humidity: weatherData.relative_humidity_2m,
      is_day: weatherData.is_day,
      wind_speed: weatherData.wind_speed_10m,
      weather_code: weatherData.weather_code,
    };
  } catch (error) {
    console.error("Unexpected Error: ", error);
    throw new Error("Something went wrong, please try again later.");
  }
}
