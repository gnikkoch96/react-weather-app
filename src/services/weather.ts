import type { Coordinates } from "../../types/weather/types.js";

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
    const response = await fetch(url, {signal: combinedSignal});

    if (!response.ok) {
      console.error("Weather API Request Failed: ", response.status);
      throw new Error(
        `Something went wrong when trying reaching weather server. Please try again later.`,
      );
    }

    const result = await response.json();

    return {
      time: result.current.time,
      interval: result.current.interval,
      temperature: result.current.temperature_2m,
      relative_humidity: result.current.relative_humidity_2m,
      is_day: result.current.is_day,
      wind_speed: result.current.wind_speed_10m,
      weather_code: result.current.weather_code,
    };
  } catch (error) {
    console.error("Unexpected Error: ", error);
    throw new Error("Something went wrong, please try again later.");
  }
}
