import SettingsButton from "./components/SettingsButton.js";
import SettingsPopup from "./components/SettingsPopup.js";
import WeatherCard from "./components/WeatherCard.js";
import { useWeatherAPIService } from "./hooks/useWeatherAPIService.js";
import { useAppSelector } from "./hooks/useAppSelector.js";

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
      <SettingsPopup/>
    </div>
    
  );
}

export default App;
