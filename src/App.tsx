import { BrowserRouter, Routes, Route } from "react-router";
import WeatherPage from "./pages/WeatherPage.js";
import LoginPage from "./pages/LoginPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage/>}/>
        <Route path='/weather' element={<WeatherPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
