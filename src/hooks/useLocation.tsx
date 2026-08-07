import { useState, useEffect } from "react";
import { getLocation } from "../services/location.js";
import type { LocationData } from "../../types/location/types.js";

export function useLocation(city: string) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<LocationData[] | null>(null);

  const fetchLocationData = async (city: string) => {
    setIsLoading(true);

    try {
      const data = await getLocation(city);
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

  // call service
  useEffect(() => {
    fetchLocationData(city);
  }, []);

  return {
    error,
    isLoading,
    locationData,
    fetchLocationData
  };
}
