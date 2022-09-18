import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

/**
 * Module Name: Missing.js
 * Date of Creation: 25/08/2022
 * Creator: Hao Xu
 * Summary: A missing page for the web application. If path leads to no exising, will be direct to this page.
 * Variable Accessed: 
 */

const Missing = () => {
  return (
    <main id='Missing'>
       <h1> Ooops... This page is Missing</h1>
       <h2>
        <Link to={'/'}><Button variant="warning">Back To Home</Button></Link>
       </h2>
       
    </main>
  )
}

export default Missing