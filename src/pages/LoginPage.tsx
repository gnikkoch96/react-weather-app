import { useNavigate } from "react-router";
import LoginCard from "../components/LoginCard.js"
import { useAppSelector } from "../hooks/useAppSelector.js"
import { useEffect } from "react";

export default function LoginPage(){
    const isLoggedIn = useAppSelector((state) => state.authConfig.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isLoggedIn);
        if(isLoggedIn){
            navigate('/weather');
        }
    }, [isLoggedIn])

    return(
        <main className="screen">
            <LoginCard/>
        </main>
    )
}