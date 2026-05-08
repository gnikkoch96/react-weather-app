import { useState, useEffect } from "react";

type LocationData = {
  location: string;
};

type WeatherData = {
  interval: number;
  is_day: number;
  relative_humidity: number;
  temperature: number;
  time: number;
  wind_speed: number;
};

async function callWeatherAPI(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response Stats: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error.message);
  }

  return null;
}

export function useWeatherAPIService(locationData?: LocationData) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m&timezone=America%2FLos_Angeles";

    const fetchWeatherData = async () => {
      const data = await callWeatherAPI(url);

      const wData: WeatherData = {
        time: data.current.time,
        interval: data.current.interval,
        temperature: data.current.temperature_2m,
        relative_humidity: data.current.relative_humidity_2m,
        is_day: data.current.is_day,
        wind_speed: data.current.wind_speed_10m   
      }

      setWeatherData(wData);
    };

    fetchWeatherData();
  }, []);

  return weatherData;
}
