import { Outlet, useNavigate } from "react-router";
import { useAppSelector } from "../hooks/useAppSelector.js";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const isLoggedIn = useAppSelector((state) => state.authConfig.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

  return <Outlet />;
}
