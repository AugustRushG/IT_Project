import { useRef, useState, useEffect } from 'react';
import {Link, useNavigate, useLocation } from 'react-router-dom' 
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

import BottomSection from '../start_page/BottomSection';


const LOGIN_URL='/api/users/login'

const LogIn = () => {
 
  //global componenet Auth
  const {setAuth}=useAuth();
  const userRef=useRef();
  const errRef=useRef();

  const navigate=useNavigate();
  const location=useLocation();
  const from=location.state?.from?.pathname||'/';

  const [user, setUser] = useState('');
 

  const [pwd, setPwd] = useState('');
 


  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(()=>{userRef.current.focus();},[])

  //useEffect on username 
  useEffect(()=>{

    console.log(user);
  },[user])

  //useEffect on password
  useEffect(()=>{
    console.log(pwd);
   
  },[pwd]);

  //useEffect on error message clean out error message when user or pwd changes 
  useEffect(()=>{setErrMsg('')},[user,pwd])

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      const response = await axios.post(LOGIN_URL,JSON.stringify({user,pwd}),
      {headers:{'Content-Type': 'application/json'},withCredentials: true});

      console.log(JSON.stringify(response?.data))

      const accessToken = response?.data?.token;
      const correct= response?.data?.success;
     
      if (correct===true){
        
        setAuth({user,pwd,accessToken})
        setUser('');
        setPwd('');
        setSuccess(true);
        
        
        console.log("success is "+success);
      }
    
    }
    catch(err){
      if (!err?.response){
       
        setErrMsg('No Serve Response');
      }
      else if (err.response?.status===400){
        setErrMsg('Password is wrong')
      }
      else if (err.response?.status===401){
        setErrMsg('Unauthorized');
      }
      else if (err.response?.status===404){
        setErrMsg('Username Not Found')
      }
      else{
        setErrMsg('LogIn Failed');
      }

      errRef.current.focus();
    }
    
  }
  return (
    <>
      {success?(
        <section>
        <h1>You are logged in!</h1>
        <br />
        <p>
            <a href="/dashboard">Go to dashboard</a>
        </p>
    </section>
      ):(

      <section>
        <p ref={errRef} className={errMsg? "errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>LogIn</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>
              Username:
            
          </label>
          <input 
            type='text' 
            id='username' 
            ref={userRef} 
            autoComplete='off' 
            onChange={(e)=>setUser(e.target.value)}
            required
            aria-describedby="uidnote"
          
            value={user}
          ></input>
         

         <label htmlFor='password'>
             Password  
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-describedby="pwdnote"
          
          />
          

          

        <button disabled={!user || !pwd ? true : false}>Sign In</button>


        </form>

        <p>
          Hasn't register yet?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="line">
            <a href="/Register">Register Now</a>
          </span>
        </p>

        <p>
          Forgot your password?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className="line">
            <a href="/Authentication">Password Reset</a>
          </span>
        </p>

      </section>
      )}
    <BottomSection></BottomSection>      
    </>
  )
}

export default LogIn