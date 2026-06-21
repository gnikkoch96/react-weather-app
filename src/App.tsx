import { BrowserRouter, Routes, Route } from "react-router";
import WeatherPage from "./pages/WeatherPage.js";
import LoginPage from "./pages/LoginPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";
import ProtectedRoute from "./components/ProtectedRoute.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="weather" element={<WeatherPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />np
      </Routes>
    </BrowserRouter>
  );
}

export default App;
