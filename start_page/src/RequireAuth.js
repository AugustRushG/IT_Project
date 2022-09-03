import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RequireAuth=()=>{
    const {auth} =useAuth();
    console.log(auth.user);
    const location = useLocation();

    return (
        auth?.user
            ?<Outlet/>
            :<Navigate to ='/LogIn' state={{from:location}}replace/>
    )
}

export default RequireAuth;