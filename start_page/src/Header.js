import React from 'react'
import{Link,useLocation} from 'react-router-dom'; 

const Header = () => {
    //get current location
    const location=useLocation();
    console.log("current is "+location.pathname);

    //if in home,signUop,Register page, header link stays the same, if in other such as dashboard, change to other link
  return (
    <header className='Header'>
        <h1><Link to='/'>RecordIt</Link></h1>
        {location.pathname.includes('/dashboard')? (<>
            <Link to = '/LogIn'><button type = "button" className='Account'>Account</button></Link>
            <Link to = '/'> <button type = "button" className='LogOut'>LogOut</button></Link>
        </>):(<>
            <Link to = '/LogIn'> <button type = "button" className='LogIn'>LogIn</button></Link>
            <Link to = '/Register'> <button type = "button" className='SignUp'>SignUp</button></Link>
        </>)}
       <Link to ='/About'> <button type = "button" className='About'>About</button></Link>
      

    </header>
  )
}

export default Header