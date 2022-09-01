import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider"
import axios from '../api/axios';

import BottomSection from '../start_page/BottomSection';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const LOGIN_URL='/api/users/login'

const LogIn = () => {
  console.log("log in page");

  const {setAuth} = useContext(AuthContext);
  const userRef=useRef();
  const errRef=useRef();

  const [user, setUser] = useState('');
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [pwdFocus, setPwdFocus] = useState(false);


  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(()=>{userRef.current.focus();},[])

  //useEffect on username 
  useEffect(()=>{
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
  },[user])

  //useEffect on password
  useEffect(()=>{
    const result= PWD_REGEX.test(pwd);
    console.log(result);
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
      //const roles = response?.data?.roles;
      const correct= response?.data?.success;
     
      if (correct===true){
       
      
        
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
            onFocus={()=>setUserFocus(true)}
            onBlur={()=>setUserFocus(false)}
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
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
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