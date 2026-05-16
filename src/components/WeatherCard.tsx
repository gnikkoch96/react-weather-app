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

const WEATHER_ICON_SIZE = 256
const WEATHER_CODE_TO_ICON: Record<number, React.ReactNode> = {
  0: <Sun size={WEATHER_ICON_SIZE}/>,
  1: <CloudSun size={WEATHER_ICON_SIZE}/>,
  2: <CloudSun size={WEATHER_ICON_SIZE}/>,
  3: <Cloud size={WEATHER_ICON_SIZE}/>,
  45: <CloudFog size={WEATHER_ICON_SIZE} />,
  48: <CloudFog size={WEATHER_ICON_SIZE} />,
  51: <CloudDrizzle size={WEATHER_ICON_SIZE} />,
  53: <CloudDrizzle size={WEATHER_ICON_SIZE} />,
  55: <CloudDrizzle size={WEATHER_ICON_SIZE} />,
  56: <CloudHail size={WEATHER_ICON_SIZE} />,
  57: <CloudHail size={WEATHER_ICON_SIZE} />,
  61: <CloudRain size={WEATHER_ICON_SIZE} />,
  63: <CloudRain size={WEATHER_ICON_SIZE} />,
  65: <CloudRain size={WEATHER_ICON_SIZE} />,
  66: <ThermometerSnowflake size={WEATHER_ICON_SIZE} />,
  67: <ThermometerSnowflake size={WEATHER_ICON_SIZE} />,
  71: <Snowflake size={WEATHER_ICON_SIZE} />,
  73: <Snowflake size={WEATHER_ICON_SIZE} />,
  75: <Snowflake size={WEATHER_ICON_SIZE} />,
  77: <CloudSnow size={WEATHER_ICON_SIZE} />,
  80: <CloudRainWind size={WEATHER_ICON_SIZE} />,
  81: <CloudRainWind size={WEATHER_ICON_SIZE} />,
  82: <CloudRainWind size={WEATHER_ICON_SIZE} />,
  85: <CloudSnow size={WEATHER_ICON_SIZE} />,
  86: <CloudSnow size={WEATHER_ICON_SIZE} />,
  95: <CloudLightning size={WEATHER_ICON_SIZE} />,
  96: <CloudLightning size={WEATHER_ICON_SIZE} />,
  99: <CloudLightning size={WEATHER_ICON_SIZE} />,
}  

export default function WeatherCard({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  return (
    <div className="max-w-md flex flex-col items-center p-4 rounded shadow-sm bg-linear-to-r from-blue-600 to-blue-400 text-white">
      <p className='mb-1'>{new Date(weatherData.time).toLocaleString()}</p>
      <div className="flex flex-col justify-center items-center gap-2.5 mb-8">
        {WEATHER_CODE_TO_ICON[weatherData.weather_code]}
        <p className="text-5xl">{weatherData.temperature} <span>&#176;</span>F</p>
      </div>
      <div className="flex justify-between text-2xl gap-6">
        <div className="flex flex-col justify-start">
          <p className="flex items-center gap-2"><Droplet /> Relative Humidity</p>
          <p className='ml-8'>{weatherData.relative_humidity} mm</p>
        </div>
        <div className="flex flex-col justify-start">
          <p className="flex items-center gap-2"><Wind /> Wind Speed</p>
          <p className='ml-8'>{weatherData.wind_speed} km/h</p>
        </div>
      </div>  
    </div>
  );
}
