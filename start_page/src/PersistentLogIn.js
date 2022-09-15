import { Outlet } from "react-router-dom";
import { useState,useEffect } from "react";
import useAuth from "./hooks/useAuth";
import React from 'react'
import useRefresh from "./hooks/useRefresh";




const PersistentLogIn = () => {

    const refresh = useRefresh();

    console.log('persistentlogin');

    const [isLoading,setIsLoading]=useState(true);

    //get auth
    const {auth} = useAuth();

    
    //console.log(setAuth);
    //console.log(auth.accessToken);
    //console.log(accessToken);

    
   

   

    useEffect(()=>{
        const verifyAccessToken=async()=>{

            console.log('verifyiing');
            try{
                // go in to refresh
                await refresh();
              
            }catch(err){
                console.error(err);
            }

            finally{
                setIsLoading(false);
            }
        }
        //if auth doesnt have accesstoken, verify, else set false. 
        !auth.accessToken?verifyAccessToken():setIsLoading(false);
    },[]);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])


  return (
   
    <>
     {/*if is loggedin return outlet else is loading*/}
   
    {isLoading? <p>Loading...</p>: <Outlet />}
    </>
  )
}

export default PersistentLogIn