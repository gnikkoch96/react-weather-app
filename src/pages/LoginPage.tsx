import { useNavigate, Navigate} from "react-router";
import LoginCard from "../components/LoginCard.js"
import { useAppSelector } from "../hooks/useAppSelector.js"

export default function LoginPage(){
    const isLoggedIn = useAppSelector((state) => state.authConfig.isLoggedIn);

    if(isLoggedIn){
        return <Navigate to='/weather'/>
    }

    return(
        <main className="screen">
            <LoginCard/>
        </main>
    )
}