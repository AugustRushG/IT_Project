import React from 'react'
import{Link,useNavigate,useLocation} from 'react-router-dom'; 
import useLogOut from './hooks/useLogOut';
import Button from 'react-bootstrap/Button';

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
        <h1 classname='RecordIt'><Link to='/' style={{color:'black'}}>RecordIt</Link></h1>
        {location.pathname.includes('/dashboard')? (<>
            {/*<Link to = '/LogIn'><Button variant="warning" type = "button" className='Account'>Account</Button></Link>*/}
            <Button variant="warning" id='LogOut' onClick={signOut}>LogOut</Button>
        </>):(<>
            <Link to = '/LogIn'  className='LogIn'> <Button variant="warning">LogIn</Button></Link>
            <Link to = '/Register' className='SignUp'> <Button variant="warning">SignUp</Button></Link>
        </>)}
       <Link to ='/About' className='About'> <Button variant="warning" >About</Button></Link>
      

    </header>
  )
}

export default Header