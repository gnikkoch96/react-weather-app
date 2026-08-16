import SettingsButton from "../components/SettingsButton.js";
import SettingsPopup from "../components/SettingsPopup.js";
import WeatherCard from "../components/WeatherCard.js";
import { useAppSelector } from "../hooks/useAppSelector.js";
import { useLocation } from "../hooks/useLocation.js";
import { useWeather } from "../hooks/useWeather.js";
import SearchLocationBar from "../components/SearchLocationBar.js";
import { useEffect, useState } from "react";
import LocationsPopup from "../components/LocationsPopup.js";
import type { LocationData } from "../../types/location/types.js";

export default function WeatherPage() {
  const [openLocationPopup, setOpenLocationPopup] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null,
  );

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

  useEffect(() => {
    if (locationData == null) return;
    setOpenLocationPopup(true);
  }, [locationData]);

  useEffect(() => {
    if (selectedLocation == null) return;

    fetchWeatherData(
      {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      },
      temperatureUnit,
      speedUnit,
    );
  }, [selectedLocation]);

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    setOpenLocationPopup(false);
  };

  return (
    <main className="screen">
      <SettingsButton />
      <SearchLocationBar
        locationLoading={locationLoading}
        fetchLocationData={fetchLocationData}
      />

      <LocationsPopup
        isOpen={openLocationPopup}
        onClose={() => setOpenLocationPopup(false)}
        locationData={locationData}
        handleLocationSelect={handleLocationSelect}
      />

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
