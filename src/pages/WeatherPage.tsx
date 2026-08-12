import SettingsButton from "../components/SettingsButton.js";
import SettingsPopup from "../components/SettingsPopup.js";
import WeatherCard from "../components/WeatherCard.js";
import { useAppSelector } from "../hooks/useAppSelector.js";
import { useLocation } from "../hooks/useLocation.js";
import { useWeather } from "../hooks/useWeather.js";
import SearchLocationBar from "../components/SearchLocationBar.js";

export default function WeatherPage() {
  const temperatureUnit = useAppSelector(
    (state) => state.weatherConfig.temperatureUnit,
  );
  const speedUnit = useAppSelector((state) => state.weatherConfig.speedUnit);
  const {
    error: locationError,
    isLoading: locationLoading,
    locationData,
    fetchLocationData,
  } = useLocation();

  const {
    error: weatherError,
    isLoading: weatherLoading,
    weatherData,
    fetchWeatherData,
  } = useWeather();

  return (
    <main className="screen">
      <SettingsButton />
      <SearchLocationBar locationLoading={locationLoading} fetchLocationData={fetchLocationData}/>
      {weatherLoading ? (
        <p className="text-2xl font-bold text-white">Loading...</p>
      ) : weatherData ? (
        <WeatherCard weatherData={weatherData} />
      ) : (
        weatherError
      )}
      <SettingsPopup />
    </main>
  );
}
