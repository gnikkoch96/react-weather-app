import { useState } from "react";
import { useWeatherAPIService } from "./hooks/useWeatherAPIService.js";

function App() {
  const [count, setCount] = useState(0);
  const weatherData = useWeatherAPIService();

  return (
    <>
      
    </>
  );
}

export default App;
