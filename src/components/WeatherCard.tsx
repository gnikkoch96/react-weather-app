import type { WeatherData } from "../../types/weather/types.js";
import { createLucideIcon, Droplet, Wind } from "lucide-react";

export default function WeatherCard({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  return (
    <div className="max-w-md flex flex-col justify-between p-4 rounded shadow-sm bg-blue-300">
      <p>{weatherData.time}</p>
      {/* todo insert icon */}
      <p className="text-6xl">{weatherData.temperature} C</p>
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
