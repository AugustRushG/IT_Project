import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
       <h1> Ooops... This page is Missing</h1>
       <h2>
        <Link to={'/'}><button>Back To Home</button></Link>
       </h2>
       
    </main>
  )
}

export default Missing