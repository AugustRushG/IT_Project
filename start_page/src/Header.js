import React from 'react'
import{Link,useNavigate,useLocation} from 'react-router-dom'; 
import useLogOut from './hooks/useLogOut';

/**
 * Module Name: Header.js 
 * Date of Creation: 22/08/2022
 * Creator: Hao Xu
 * Summary: The header component of the website, contains four buttons. Button changes according to different path.
 * Variable Accessed: useLocation, useLogOut, useNavigate.
 */

const Header = () => {
    //get current location
    const location=useLocation();
    console.log("current is "+location.pathname);

    const navigate=useNavigate();
    const logOut=useLogOut();


    //function to help user log out
    const signOut=async()=>{
      await logOut();
      navigate('/')
    }


    //if in home,signUop,Register page, header link stays the same, if in other such as dashboard, change to other link
  return (
    <header className='Header'>
        <h1><Link to='/'>RecordIt</Link></h1>
        {location.pathname.includes('/dashboard')? (<>
            <Link to = '/LogIn'><button type = "button" className='Account'>Account</button></Link>
            <button type = "button" className='LogOut' onClick={signOut}>LogOut</button>
        </>):(<>
            <Link to = '/LogIn'> <button type = "button" className='LogIn'>LogIn</button></Link>
            <Link to = '/Register'> <button type = "button" className='SignUp'>SignUp</button></Link>
        </>)}
       <Link to ='/About'> <button type = "button" className='About'>About</button></Link>
      

    </header>
  )
}

export default Header