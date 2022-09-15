import { useContext } from "react";
import AuthContext from "../context/AuthProvider"

/**
 * Module Name:useAuth.js
 * Date of Creation: 03/09/2022
 * Creator: Hao Xu
 * Summary: A custome userhook to store and access auth contontext.
 * Variable Accessed: 
 */

const useAuth=()=>{
    return useContext(AuthContext);
}

export default useAuth;