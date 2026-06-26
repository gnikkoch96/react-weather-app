import { Navigate, Outlet, useNavigate } from "react-router";
import { useAppSelector } from "../hooks/useAppSelector.js";

export default function ProtectedRoute() {
  const isLoggedIn = useAppSelector((state) => state.authConfig.isLoggedIn);
  
  if(!isLoggedIn){
    return <Navigate to='/' replace/>
  }

  return <Outlet />;
}
