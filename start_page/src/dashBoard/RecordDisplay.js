import React from 'react'
import Feed from './Feed'

/**
 * Module Name:RecordDisplay.js
 * Date of Creation: 06/09/2022
 * Creator: HaoXu
 * Summary: Record display class to display all records been passed in from the back end
 * Variable Accessed: 
 */

const RecordDisplay = ({records,setExpenditure,date,setIncome,searchResult}) => {

  
  return (
    <main className='RecordDisplay'>
      
      <span id='Category'>Category</span>
      <span id='Date'>Date</span>
      <span id='Money'>Money</span>
      <span id='Notes'>Notes</span>
      
      

      {/* if records exist, pass in all necessary values, otherwise show no records been recorded */}
      {records.length?(
       
        <Feed setExpenditure={setExpenditure} date={date} setIncome={setIncome} searchResult={searchResult} records={records}></Feed>
      ):
      <p id='NoRecords'>
        No Records been recorded yet.
      </p>
      }
    </main>
  )
}

export default RecordDisplay