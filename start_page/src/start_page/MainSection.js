import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';


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


        <h1 id='welcome'>Welcome To RecordIt</h1>
        <p id='start'>Start saving money today </p>
        
        
        <Link to='/Register'  className='RegisterNow'>
          <Button variant="warning">Register Now</Button>
        </Link>

        <div id='imageContainer'> <img src='magnet.png' alt='img' id='magnet'/></div>
       
        
      </main>
      
    </>
    
  )
}

export default MainSection