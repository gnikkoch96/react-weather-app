import WeatherCard from "./components/WeatherCard.js";
import { useWeatherAPIService } from "./hooks/useWeatherAPIService.js";

function App() {
  const { error, isLoading, weatherData } = useWeatherAPIService();
  return (
    <div className="min-h-screen bg-blue-400">
      {isLoading ? (
        "Loading..."
      ) : weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : (
        error
      )}
    </div>
  );
}

export default App;
