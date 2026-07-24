import { useState, useEffect } from "react";
import type { Coordinates, WeatherData } from "../../types/weather/types.js";
import { getWeather } from "../services/weather.js";

export function useWeatherAPIService(
  { latitude, longitude }: Coordinates,
  temperatureUnit: string,
  speedUnit: string,
) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);

      const data = await getWeather({latitude, longitude}, temperatureUnit, speedUnit);

      setWeatherData(data);
      setIsLoading(false);
    };

    fetchWeatherData();
  }, [temperatureUnit, speedUnit]);

  return { error, isLoading, weatherData };
}
