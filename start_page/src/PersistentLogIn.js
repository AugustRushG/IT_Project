import { Outlet } from "react-router-dom";
import { useState,useEffect } from "react";
import useAuth from "./hooks/useAuth";
import React from 'react'
import useRefresh from "./hooks/useRefresh";

/**
 * Module Name: PersistentLogIn.js
 * Date of Creation: 14/09/2022
 * Creator: Hao Xu  
 * Summary: PersistentLogIn protects the user from logging out when refreshing the website. It sends uses useRefresh hook to check
 * the accesssToken is still right. If so, stays logging in. Else, return back to home page.
 * Variable Accessed: useRefresh.
 */


const PersistentLogIn = () => {

    const refresh = useRefresh();
    const [isLoading,setIsLoading]=useState(true);

    //get auth
    const {auth} = useAuth();

    useEffect(()=>{
        const verifyAccessToken=async()=>{
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

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`)
    //     console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    // }, [isLoading])


  return (
    <>
     {/*if is loggedin return outlet else is loading*/}
    {isLoading? <p>Loading...</p>: <Outlet />}
    </>
  )
}

export default PersistentLogIn