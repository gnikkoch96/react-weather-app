import { BrowserRouter, Routes, Route } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute.js";
import { Suspense, lazy } from "react";

const LoginPage = lazy(() => import("./pages/LoginPage.js"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.js"))
const WeatherPage = lazy(() => import("./pages/WeatherPage.js"))


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="screen">Loading Page...</div>}>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="weather" element={<WeatherPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
