import { useState, useEffect } from "react";
import type { LocationData, WeatherData } from "../../types/weather/types.js";
import { useAppSelector } from "./useAppSelector.js";

async function callWeatherAPI(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response Stats: ${response.status}`);
    }

    const result = await response.json();
    return { result, error: null };
  } catch (error: any) {
    console.error(error.message);
    return { error: error.message };
  }
}

export function useWeatherAPIService({latitude, longitude}: {latitude: number, longitude: number}) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const temperatureUnit = useAppSelector(
    (state) => state.weatherConfig.temperatureUnit,
  );
  const speedUnit = useAppSelector((state) => state.weatherConfig.speedUnit);

  useEffect(() => {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m,weather_code&timezone=America%2FLos_Angeles`;

    // default values like celcius and kmh don't need the string fields
    if (temperatureUnit != "celcius") {
      url += `&temperature_unit=${temperatureUnit}`;
    }

    if (speedUnit != "kmh") {
      url += `&wind_speed_unit=${speedUnit}`;
    }

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
        weather_code: data.result.current.weather_code,
      };

      setWeatherData(wData);
      setIsLoading(false);
    };

    fetchWeatherData();
  }, [temperatureUnit, speedUnit]);

  return { error, isLoading, weatherData };
}
