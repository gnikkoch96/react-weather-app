import type { LocationData } from "../../types/location/types.js";

type LocationApiData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
};

/* 
  Responsibility
  1. Acts as the service layer for location retrieval
  2. Fetches location data from Geolocation API
  3. Transforms Geolocation API data into the app's LocationData format
*/
export async function getLocation(cityName: string) {
  const formattedCityName = encodeURIComponent(cityName.trim().toLowerCase());

  if(!formattedCityName){
    throw new Error("City name cannot be empty");
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${formattedCityName}&count=5&language=en&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Response Stats: ${response.status}`);
  }

  const result = await response.json();

  if (!result.results) {
    throw new Error("Invalid location response");
  }

  const resultsArr: LocationApiData[] = result.results;
  const locationData: LocationData[] = resultsArr.map((location) => ({
    id: location.id,
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
    country: location.country || "Unknown Country",
    state: location.admin1 || "Unknown State",
    county: location.admin2 || "Unknown County",
  }));

  return locationData;
}
