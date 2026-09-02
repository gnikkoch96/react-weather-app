import { useEffect, useState, useRef } from "react";
import { searchLocations } from "../services/location.js";
import type { LocationData } from "../../types/location/types.js";

/*
  Responsibility:
  1. Orchestrates and manages the location service calls
  2. Returns the state of the location service calls
  3. Provides an action function that components can use to interact with the service layer from the hook
*/
export function useLocation() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<LocationData[] | null>(null);
  const controllerRef = useRef(new AbortController());

  useEffect(() => {
    // abort requests to location when hook gets unmounted
    return () => {
      controllerRef.current.abort();
    };
  }, []);

  const fetchLocationData = async (city: string) => {
    // if there were any request being made abort them
    controllerRef.current.abort();
    const newController = new AbortController();
    controllerRef.current = newController;

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchLocations(city, controllerRef.current.signal);
      setLocationData(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      if(newController === controllerRef.current) 
        setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    locationData,
    fetchLocationData,
  };
}
