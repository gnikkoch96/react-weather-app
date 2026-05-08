import { useState } from "react";
import { useWeatherAPIService } from "./hooks/useWeatherAPIService.js";

function App() {
    const {error, isLoading, weatherData} = useWeatherAPIService();

  return (
    <>
      
    </>
  );
}

export default App;
