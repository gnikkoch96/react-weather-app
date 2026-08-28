import { useState, useEffect } from "react";
import { searchLocations } from "../services/location.js";
import type { LocationData } from "../../types/location/types.js";

export function useLocation() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<LocationData[] | null>(null);

  const fetchLocationData = async (city: string) => {
    setIsLoading(true);

    try {
      const data = await searchLocations(city);
      setLocationData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    locationData,
    fetchLocationData
  };
}
