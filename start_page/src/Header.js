import React from 'react'
import{Link, Route, Routes, useNavigate} from 'react-router-dom'; 

const Header = () => {
  return (
    <header className='Header'>
        <h1>RecordIt</h1>
       
        <button className='LogIn'><Link to = '/LogIn'>LogIn</Link></button>
        <button className='SignUp'><Link to = '/SignUp'>SignUp</Link></button>
        
    </header>
  )
}

export default Header