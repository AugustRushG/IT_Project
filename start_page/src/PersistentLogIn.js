import { Outlet } from "react-router-dom";
import { useState,useEffect } from "react";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";
import React from 'react'

const CHECKURL='api/users/checkToken'

const PersistentLogIn = () => {

    const [isLoggedIn,setIsLoggedIn]=useState(true);

    //get auth
    const {auth} = useAuth();

    // get token from storage
    const accessToken=JSON.parse(localStorage.getItem('accessToken'))
    const user=JSON.parse(localStorage.getItem('user'));
    const pwd=JSON.parse(localStorage.getItem('pwd'))


    useEffect(()=>{
        const verifyAccessToken=async()=>{
            console.log(`checking ${accessToken}`);
            
            try{
                const response = await axios.get(CHECKURL,JSON.stringify(accessToken),
                {headers:{'Content-Type': 'application/json'},withCredentials: true});
                console.log(JSON.stringify(response));
                // if success set useAuth
                auth({user,pwd,accessToken});

            }catch(err){
                console.error(err);
            }
            finally{
                setIsLoggedIn(false);
            }

        }

        //if auth still have accesstoken, no need to verify, else verify the token. 
        //auth.accessToken?setIsLoggedIn(true):verifyAccessToken()

    },[])
  return (
   
    <>
     {/*if is loggedin return outlet else is loading*/}
    {isLoggedIn?<Outlet/>:<p>Is Loading</p>}
    </>
  )
}

export default PersistentLogIn