import { useState } from "react";
import { useWeatherAPIService } from "./hooks/useWeatherAPIService.js";

function App() {
  const { error, isLoading, weatherData } = useWeatherAPIService();
  return (
    <>
      <p>
        {isLoading ? (
          "Loading..."
        ) : weatherData ? (
          <div>
            <p>{weatherData.interval}</p>
            <p>{weatherData.is_day}</p>
            <p>{weatherData.relative_humidity}</p>
            <p>{weatherData.temperature}</p>
            <p>{weatherData.time}</p>
            <p>{weatherData.wind_speed}</p>
          </div>
        ) : (
          error
        )}
      </p>
    </>
  );
}

export default App;
