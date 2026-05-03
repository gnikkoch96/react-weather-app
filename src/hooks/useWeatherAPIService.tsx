import { useState } from "react";

type LocationData = {
    location: string
}

export function useWeatherAPIService(locationData: LocationData){
    const [weatherData, setWeatherData] = useState();

}