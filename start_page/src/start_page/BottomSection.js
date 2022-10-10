import React from 'react'


/**
 * Module Name: BottomSection.js
 * Date of Creation: 22/08/2022
 * Creator: Hao Xu  
 * Summary: BottomSection of the startPage
 * Variable Accessed: 
 */


const BottomSection = () => {
  return (
    <main className='BottomSection'>
      <>
        
        <div className='bottomh1'>
          <div id='imgcontainers'>  <img src="/financial-profit.png" alt="img" id='botIcons'/></div>
         
          <br/>
          <p id='stitle'>Save Money</p>
          <span id='small'>
            Set up budget so you can 
            be prepared of financial emergenices 
            and unexpected expenses.
          </span>
        </div>
      </>
        <div className='bottomh2'>
          <div id='imgcontainers'> <img src="/money-bag.png" alt="img" id='botIcons'/></div>
          
          <br/>
          <p id='stitle'>Day to day bookkeeping</p>
          <span id='small'>
            Tired of collecting receipts 
            to track all your expenses? 
            This is your solution
          </span>
        </div>
        
        <div className='bottomh3'>
          <div id='imgcontainers'>  <img src="/profits.png" alt="img" id='botIcons'/></div>
         
          <br/>
          <p id='stitle'>Manage Income</p>
          
          <span id='small'>Track all the income and
            make smarter decisions to invest</span>
        </div>
    </main>
  )
}

export default BottomSection