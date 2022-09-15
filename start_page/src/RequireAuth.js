import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

/**
 * Module Name: RequireAuth
 * Date of Creation: 03/09/2022
 * Creator: Hao Xu
 * Summary：A module that returns the dashboard if auth.user exist. Else return back to logIn module
 * Variables accessed: useAuth, useLocation
 */

const RequireAuth=()=>{

    //access auth and current location.
    const {auth} =useAuth();
    const location = useLocation();

    return (
        auth?.user
            ?<Outlet/>
            :<Navigate to ='/LogIn' state={{from:location}}replace/>
    )
}

export default RequireAuth;