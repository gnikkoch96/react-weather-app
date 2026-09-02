import { useState, useEffect, useCallback } from "react";
import type { Coordinates, SpeedUnit, TemperatureUnit, WeatherData } from "../../types/weather/types.js";
import { getWeather } from "../services/weather.js";

/**
 * Responsibility:
 * 1. Orchestrates and manages weather service calls.
 * 2. Returns the state of weather service calls.
 * 3. Provides an action function for callers to execute weather service calls.
 */
export function useWeather() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeatherData = useCallback(
    async (
      { latitude, longitude }: Coordinates,
      temperatureUnit: TemperatureUnit,
      speedUnit: SpeedUnit,
    ) => {
      try {
        setIsLoading(true);

        const data = await getWeather(
          { latitude, longitude },
          temperatureUnit,
          speedUnit,
        );

        setWeatherData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { error, isLoading, weatherData, fetchWeatherData };
}
