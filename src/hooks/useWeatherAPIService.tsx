import { useState } from "react";

type LocationData = {
    location: string
}

type WeatherData = {
    
}

async function callWeatherAPI(url: string){
    try{
        const response = await fetch(url);
        
        if(!response.ok){
            throw new Error(`Response Stats: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);

    }catch(error: any){
        console.log(error.message);
    }
}

export async function useWeatherAPIService(locationData?: LocationData){
    const [weatherData, setWeatherData] = useState();

    const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,relative_humidity_2m,is_day,wind_speed_10m&timezone=America%2FLos_Angeles'


    // await callWeatherAPI(url);
}