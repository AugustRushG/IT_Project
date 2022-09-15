import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Module Name: MainSection.js
 * Date of Creation: 22/08/2022
 * Creator: Hao Xu
 * Summary: Main Section of the start page
 * Variable Accessed: 
 */

const MainSection = () => {
  return (
    <>
      <main className='MainSection'>
      
        <h1>Welcome To RecordIt</h1>
        <p>Start saving money today </p>
        
        
        <Link to='/Register'  className='RegisterNow'>
          <button>Register Now</button>
        </Link>
      
        <img src='magnet.png' alt='img'/>
        
      </main>
      
    </>
    
  )
}

export default MainSection