import React from 'react'
import{Link, useNavigate,useLocation} from 'react-router-dom'; 

const Header = () => {
    //get current location
    const location=useLocation();
    console.log(location.pathname);

    //if in home,signUop,Register page, header link stays the same, if in other such as dashboard, change to other link
  return (
    <header className='Header'>
        <h1>RecordIt</h1>
        {location.pathname==='/dashboard'? (<>
            <button className='Account'><Link to = '/LogIn'>Account</Link></button>
            <button className='LogOut'><Link to = '/'>LogOut</Link></button>
        </>):(<>
            <button className='LogIn'><Link to = '/LogIn'>LogIn</Link></button>
            <button className='SignUp'><Link to = '/Register'>SignUp</Link></button>
        </>)}
      

    </header>
  )
}

export default Header