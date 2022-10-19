import React from 'react'
import Feed from './Feed'
import Loading from '../Loading';

/**
 * Module Name:RecordDisplay.js
 * Date of Creation: 06/09/2022
 * Creator: HaoXu
 * Summary: Record display class to display all records been passed in from the back end
 * Variable Accessed: 
 */

const RecordDisplay = ({records,setExpenditure,date,setIncome,searchResult,setRefresh,loading}) => {

  
  return (
    <main className='RecordDisplay'>
      
      <div id='CategoryContainer'><span id='Category'>Category</span></div>
      <div id='DateContainer'><span id='Date'>Date</span></div>
      <div id='MoneyContainer'><span id='Money'>Money</span></div>
      <div id='NotesContainer'><span id='Notes'>Notes</span></div>
      
      
      {loading? <Loading type="balls" color='#fff' /> : 
      
      records.length?(
       
        <Feed setExpenditure={setExpenditure} date={date} setIncome={setIncome} searchResult={searchResult} records={records} setRefresh={setRefresh}></Feed>
      ):
      <p id='NoRecords'>
        No Records been recorded yet.
      </p>
      }
     
      
      

      {/* if records exist, pass in all necessary values, otherwise show no records been recorded */}
      
    </main>
  )
}

export default RecordDisplay