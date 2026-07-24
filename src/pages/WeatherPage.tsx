import SettingsButton from "../components/SettingsButton.js";
import SettingsPopup from "../components/SettingsPopup.js";
import WeatherCard from "../components/WeatherCard.js";
import { useAppSelector } from "../hooks/useAppSelector.js";
import { useWeatherAPIService } from "../hooks/useWeatherAPIService.js";

export default function WeatherPage() {
  const temperatureUnit = useAppSelector(
    (state) => state.weatherConfig.temperatureUnit,
  );
  const speedUnit = useAppSelector((state) => state.weatherConfig.speedUnit);

  const { error, isLoading, weatherData } = useWeatherAPIService({
    latitude: 50,
    longitude: 50,
  }, temperatureUnit, speedUnit);

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
