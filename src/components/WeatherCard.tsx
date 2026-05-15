import type { WeatherData } from "../../types/weather/types.js";
import {
  Droplet,
  Wind,
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  Snowflake,
  CloudSnow,
  CloudHail,
  CloudLightning,
  ThermometerSnowflake,
} from "lucide-react";

const WEATHER_CODE_TO_ICON: Record<number, React.ReactNode> = {
  0: <Sun/>,
  1: <CloudSun/>,
  2: <CloudSun/>,
  3: <Cloud/>,
  45: <CloudFog />,
  48: <CloudFog />,
  51: <CloudDrizzle />,
  53: <CloudDrizzle />,
  55: <CloudDrizzle />,
  56: <CloudHail />,
  57: <CloudHail />,
  61: <CloudRain />,
  63: <CloudRain />,
  65: <CloudRain />,
  66: <ThermometerSnowflake />,
  67: <ThermometerSnowflake />,
  71: <Snowflake />,
  73: <Snowflake />,
  75: <Snowflake />,
  77: <CloudSnow />,
  80: <CloudRainWind />,
  81: <CloudRainWind />,
  82: <CloudRainWind />,
  85: <CloudSnow />,
  86: <CloudSnow />,
  95: <CloudLightning />,
  96: <CloudLightning />,
  99: <CloudLightning />,
}

export default function WeatherCard({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  return (
    <div className="max-w-md flex flex-col justify-between p-4 rounded shadow-sm bg-blue-300">
      <p>{weatherData.time}</p>
      <div>
        {WEATHER_CODE_TO_ICON[weatherData.weather_code]}
        <p className="text-6xl">{weatherData.temperature} C</p>
      </div>
      <div className="flex justify-between text-2xl">
        <div className="flex justify-center items-center">
          <Droplet />
          Relative Humidity {weatherData.relative_humidity} mm
        </div>
        <div className="flex justify-center items-center">
          <Wind />
          Wind Speed {weatherData.wind_speed} km/h
        </div>
      </div>
    </div>
  );
}
