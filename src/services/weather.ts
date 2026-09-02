import type { Coordinates, SpeedUnit, TemperatureUnit } from "../../types/weather/types.js";
import { z, ZodError } from "zod";
import { createAbortSignal } from "../utils/abort.js";

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
  temperatureUnit: TemperatureUnit,
  speedUnit: SpeedUnit,
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

  const { signal, signalCleanup } = createAbortSignal(externalSignal);

  try {
    const response = await fetch(url, { signal: signal });

    if (!response.ok) {
      console.error("Weather API Request Failed: ", response.status);
      throw new Error(
        `Something went wrong when trying to reach the weather server. Please try again later.`,
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
    if (error instanceof ZodError) {
      console.error("Invalid weather API response: ", error);
      throw new Error(
        "Something went wrong with fetching weather. Please try again later.",
      );
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      console.error("API Response timeout: ", error);
      throw new Error(
        "The weather request took too long and was canceled. Please try again.",
      );
    }

    console.error("Unexpected Error: ", error);
    throw new Error("Something went wrong, please try again later.");
  } finally {
    signalCleanup();
  }
}
