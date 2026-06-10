import { BrowserRouter, Routes, Route } from "react-router";
import WeatherPage from "./pages/WeatherPage.js";

/* TODO remove unused import */
import { useAppSelector } from "./hooks/useAppSelector.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/weather' element={<WeatherPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
