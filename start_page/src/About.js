import React from 'react'


/**
 * Module Name: About.js
 * Date of Creation: 30/08/2022
 * Creator:Hao Xu
 * Summary: A about page in the web application that display some information about the website.
 * Variable Accessed: 
 */

const About = () => {
  
  return (
    <section className='About'>
        <h1>
          What is RecordIt?
        </h1>
        <p>
           RecordIt is a website that provides a platform for people who need some platform 
           to record their expense and income. It also provides money management functionalities 
           that users can explore. 
        </p>
        <br></br>
        <h1>
          What do we do?  
        </h1>
        <p>
          Our users can register private accounts, and start making records for each month. 
          Our system automatically updates and summaries the monthly expenditure for you with clear diagrams and data. 
          It is also possible to upload files for your records such as your receipts.
        </p>
        <br></br>
        <h1>
        Why do we do it?
        </h1>
        <p>
          There are many existing bookkeeping mobile applications. 
          We would like to create an online website that does not require 
          users to download any application which increases convenience. 
        </p>
        <br></br>
        <h1>
        Who's behind RecordIt?
        </h1>
        <p>
        Here, our team members are undergraduate students from UniMelb.
        </p>
        <p>Phone: (04) 88256155</p>
        <p>Email: service@recordit.com.au</p>
    </section>
  )
}

export default About