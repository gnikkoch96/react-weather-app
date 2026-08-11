import { useState, useEffect } from "react";
import type { Coordinates, WeatherData } from "../../types/weather/types.js";
import { getWeather } from "../services/weather.js";

export function useWeather() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const fetchWeatherData = async (
    { latitude, longitude }: Coordinates,
    temperatureUnit: string,
    speedUnit: string,
  ) => {
    setIsLoading(true);

    const data = await getWeather(
      { latitude, longitude },
      temperatureUnit,
      speedUnit,
    );

    setWeatherData(data);
    setIsLoading(false);
  };

  return { error, isLoading, weatherData, fetchWeatherData };
}
