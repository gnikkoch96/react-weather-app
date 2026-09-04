import type { LocationData } from "../../types/location/types.js";
import { z, ZodError } from "zod";
import { createAbortSignal } from "../utils/abort.js";

const locationSchema = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  country: z.string().optional(),
  admin1: z.string().optional(),
  admin2: z.string().optional(),
});

const locationsSchema = z.array(locationSchema);

/*  
  Responsibility
  1. Acts as the service layer for location retrieval
  2. Fetches location data from Geolocation API
  3. Transforms Geolocation API data into the app's LocationData format
*/
export async function searchLocations(
  cityName: string,
  externalSignal?: AbortSignal,
) {
  const formattedCityName = encodeURIComponent(cityName.trim().toLowerCase());

  if (!formattedCityName) {
    throw new Error("City name cannot be empty");
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${formattedCityName}&count=5&language=en&format=json`;

  const {signal, timeoutCleanup} = createAbortSignal(externalSignal);

  try {
    const response = await fetch(url, { signal: signal });

    if (!response.ok) {
      console.error("Location API request failed:", response.status);
      throw new Error(
        "Something went wrong reaching the location server. Please try again later.",
      );
    }

    const result = await response.json();

    const resultsArr = locationsSchema.parse(result.results);

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
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Invalid location API response: ", error);
      throw new Error(
        "Something went wrong with fetching location. Please try again later.",
      );
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      console.error("API Response timeout: ", error);
      throw new Error(
        "The location request took too long and was canceled. Please try again.",
      );
    }

    console.error("Unexpected Error: ", error);
    throw new Error("Something went wrong, please try again later.");
  } finally {
    timeoutCleanup();
  }
}
