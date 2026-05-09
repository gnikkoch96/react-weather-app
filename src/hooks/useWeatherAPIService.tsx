import { useState, useEffect } from "react";
import type { LocationData, WeatherData } from "../../types/weather/types.js";

async function callWeatherAPI(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response Stats: ${response.status}`);
    }

    const result = await response.json();
    return {result, error: null};
  } catch (error: any) {
    console.error(error.message);
    return { error: error.message };
  }
}

export function useWeatherAPIService(locationData?: LocationData) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m&timezone=America%2FLos_Angeles";

    const fetchWeatherData = async () => {
      setIsLoading(true);

      const data = await callWeatherAPI(url);

      // error handling: no data no continue
      if (data.error) {
        setError(data.error);
        setIsLoading(false);
        return;
      }

      const wData: WeatherData = {
        time: data.result.current.time,
        interval: data.result.current.interval,
        temperature: data.result.current.temperature_2m,
        relative_humidity: data.result.current.relative_humidity_2m,
        is_day: data.result.current.is_day,
        wind_speed: data.result.current.wind_speed_10m,
      };

      setWeatherData(wData);
      setIsLoading(false);
    };

    fetchWeatherData();
  }, []);

  return { error, isLoading, weatherData };
}
