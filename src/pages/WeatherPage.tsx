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

/*
  Responsibility:
  1. Manages page-level location state (selectedLocation & openLocationPopup)
  2. Coordinate location and weather fetching
     a. Calls the fetching actions exposed by useLocation & useWeather
     b. Decides WHEN weather should be fetched based on the selected location and weather settings
  3. Coordinate data between components
     a. Passes location-fetching functionality to SearchLocationBar
     b. Passes location results and selection behavior to LocationsPopup
     c. Passes selected location and weather data to WeatherCard
  4. Coordinate UI state based on data changes
     a. Opens the location popup when new location results arrive
     b. Closes it when a location is selected
*/
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
  }, [selectedLocation, temperatureUnit, speedUnit, fetchWeatherData]);

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    setOpenLocationPopup(false);
  };

  return (
    <main className="screen">
      <SettingsButton />
      <SearchLocationBar
        locationLoading={locationLoading}
        locationError={locationError}
        fetchLocationData={fetchLocationData}
      />

      {locationData && (
        <LocationsPopup
          isOpen={openLocationPopup}
          onClose={() => setOpenLocationPopup(false)}
          locationData={locationData}
          handleLocationSelect={handleLocationSelect}
        />
      )}

      {weatherLoading ? (
        <p className="text-2xl font-bold text-white">Loading...</p>
      ) : weatherError ? (
        <p className="text-2xl font-bold text-white">{weatherError}</p>
      ) : weatherData && selectedLocation ? (
        <WeatherCard
          temperatureUnit={temperatureUnit}
          speedUnit={speedUnit}
          locationData={selectedLocation}
          weatherData={weatherData}
        />
      ) : null}

      <SettingsPopup />
    </main>
  );
}
