import SettingsButton from "../components/SettingsButton.js";
import SettingsPopup from "../components/SettingsPopup.js";
import WeatherCard from "../components/WeatherCard.js";
import { useWeatherAPIService } from "../hooks/useWeatherAPIService.js";

export default function WeatherPage() {
  const { error, isLoading, weatherData } = useWeatherAPIService();

  return (
    <main className="screen">
      <SettingsButton />
      {isLoading ? (
        <p className="text-2xl font-bold text-white">Loading...</p>
      ) : weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : (
        error
      )}
      <SettingsPopup />
    </main>
  );
}
