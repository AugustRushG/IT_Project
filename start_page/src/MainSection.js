import React from 'react'
import { Link } from 'react-router-dom'

const MainSection = () => {
  return (
    <main className='MainSection'>
        <h1>Welcome To RecordIt</h1>
        <p>Start saving money today </p>
        <button className='RegisterNow'>
            <Link to='/SignUp'>Register Now</Link>
        </button>
    </main>
  )
}

export default MainSection