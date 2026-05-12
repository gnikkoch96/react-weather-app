import WeatherCard from "./components/WeatherCard.js";
import { useWeatherAPIService } from "./hooks/useWeatherAPIService.js";

function App() {
  const { error, isLoading, weatherData } = useWeatherAPIService();
  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-r from-blue-900 to-blue-600">
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
