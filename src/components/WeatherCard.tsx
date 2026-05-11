import type { WeatherData } from "../../types/weather/types.js"

export default function WeatherCard({weatherData} : {weatherData: WeatherData}){
    return (
        <div>
            <p>{weatherData.temperature}</p>
            <p>{weatherData.time}</p>
            <p>{weatherData.relative_humidity}</p>
            <p>{weatherData.wind_speed}</p>
        </div>
    )
}