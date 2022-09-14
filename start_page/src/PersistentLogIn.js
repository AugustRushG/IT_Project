import { Outlet } from "react-router-dom";
import { useState,useEffect } from "react";
import useAuth from "./hooks/useAuth";

import React from 'react'


const PersistentLogIn = () => {

    const [isLoading,setIsLoading]=useState(true);
    const {auth} = useAuth;

    useEffect(()=>{
        const verifyAccessToken=async()=>{
            try{

            }catch(err){
                
            }

        }

        auth?.accessToken


    },[])
  return (
    <div>PersistentLogIn</div>
  )
}

export default PersistentLogIn