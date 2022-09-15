import axios from "../api/axios";
import useAuth from "./useAuth";

/**
 * Module Name: useLogOut.js
 * Date of Creation: 15/09/2022
 * Creator: Hao Xu
 * Summary: A custome userhook to log out the user. Set auth to empty and local storage to empty to prevent other people access.
 * Variable Accessed: 
 */

const LOGOUT_URL='api/users/logout';
const useLogOut=()=>{
    const {setAuth}=useAuth();
    const logOut=async()=>{
        //set auth to empty
        setAuth({});
        //clean local storage
        localStorage.clear();
        try{
            const response=await axios.get(LOGOUT_URL,{
                headers:{
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : JSON.parse(localStorage.getItem('accessToken'))}
            });

        }catch(err){
            console.error(err);
        }
    }
    return logOut;
}

export default useLogOut; 