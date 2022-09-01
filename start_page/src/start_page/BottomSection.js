import React from 'react'

const BottomSection = () => {
  return (
    <main className='BottomSection'>
      <>
        
        <span className='bottomh'><img src="/financial-profit.png" alt="img" /><br/>
        Save Money
          <span id='small'>
            Set up budget so you can 
            be prepared of financial emergenices 
            and unexpected expenses.
          </span>
        </span>
      </>
      
        
        <span className='bottomh' id='middleOne'><img src="/money-bag.png" alt="img" /><br/>
        Day to day bookkeeping
          <span id='small'>
            Tired of collecting receipts 
            to track all your expenses? 
            This is your solution
          </span>
        </span>
        
        <span className='bottomh'><img src="/profits.png" alt="img" /><br/>
        Manage Income
          <span id='small'>Track all the income and
            make smarter decisions to invest</span>
        </span>
    </main>
  )
}

export default BottomSection