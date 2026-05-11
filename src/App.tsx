import WeatherCard from "./components/WeatherCard.js";
import { useWeatherAPIService } from "./hooks/useWeatherAPIService.js";

function App() {
  const { error, isLoading, weatherData } = useWeatherAPIService();
  return (
    <>
      <p>
        {isLoading ? (
          "Loading..."
        ) : weatherData ? (
          <WeatherCard weatherData={weatherData}/>
        ) : (
          error
        )}
      </p>
    </>
  );
}

export default App;
