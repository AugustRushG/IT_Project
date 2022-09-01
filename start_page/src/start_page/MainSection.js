import React from 'react'
import { Link } from 'react-router-dom'

const MainSection = () => {
  return (
    <>
      <main className='MainSection'>
      
        <h1>Welcome To RecordIt</h1>
        <p>Start saving money today </p>
        
        <button className='RegisterNow'>
            <Link to='/Register'>Register Now</Link>
        </button>
        <img src='magnet.png' alt='img'/>
        
      </main>
      
    </>
    
  )
}

export default MainSection