import type { LocationData } from "../../types/weather/types.js";

export async function getLocation(cityName: string){
]    const formattedCityName = cityName.trim().replaceAll(" ", "+").toLowerCase();

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${formattedCityName}&count=5&language=en&format=json`

    const response = await fetch(url);

    if(!response.ok){
        throw new Error(`Response Stats: ${response.status}`)
    }

    const result = await response.json();

    if(!result.results){
        throw new Error("Invalid location response");
    }

    const resultsArr = result.results;
    const locationData: LocationData[] = resultsArr.map((location) => ({
        name: location.name,
        latitude: location.latitude,
        longitude: location.longitude,
        country: location.country,
        state: location.admin1,
        county: location.admin2
    }));


    return locationData;
}