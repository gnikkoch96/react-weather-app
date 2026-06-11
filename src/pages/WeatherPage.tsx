import SettingsButton from "../components/SettingsButton.js";
import SettingsPopup from "../components/SettingsPopup.js";
import WeatherCard from "../components/WeatherCard.js";
import { useWeatherAPIService } from "../hooks/useWeatherAPIService.js";

export default function WeatherPage() {
  const { error, isLoading, weatherData } = useWeatherAPIService();

  return (
    <div className="screen">
      <SettingsButton />
      {isLoading ? (
        "Loading..."
      ) : weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : (
        error
      )}
      <SettingsPopup />
    </div>
  );
}
