import React from 'react'
import{Link, Route, Routes, useNavigate,useLocation} from 'react-router-dom'; 

const Header = () => {
    //get current location
    const location=useLocation();

    //if in home,signUop,Register page, header link stays the same, if in other such as dashboard, change to other link
  return (
    <header className='Header'>
        <h1>RecordIt</h1>
        {location.pathname==='/' || location.pathname==='/LogIn' || location.pathname==='/SignUp'? (<>
            <button className='LogIn'><Link to = '/LogIn'>LogIn</Link></button>
            <button className='SignUp'><Link to = '/SignUp'>SignUp</Link></button>
        </>):(<>
            <button className='Account'><Link to = '/LogIn'>Account</Link></button>
            <button className='LogOut'><Link to = '/SignUp'>LogOut</Link></button>
        </>)}
      

    </header>
  )
}

export default Header