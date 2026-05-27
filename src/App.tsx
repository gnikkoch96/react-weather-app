import SettingsButton from "./components/SettingsButton.js";
import WeatherCard from "./components/WeatherCard.js";
import { useWeatherAPIService } from "./hooks/useWeatherAPIService.js";

function App() {
  const { error, isLoading, weatherData } = useWeatherAPIService();
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-800">
      <SettingsButton/>
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
