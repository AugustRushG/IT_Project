import React from 'react'
import Feed from './Feed'


const RecordDisplay = ({records,setExpenditure,date,setIncome,searchResult}) => {
  return (
    <main className='RecordDisplay'>
      <span id='Category'>Category</span>
      <span id='Date'>Date</span>
      <span id='Money'>Money</span>
      <span id='Notes'>Notes</span>
        
      {records.length?(
        <Feed records={records} setExpenditure={setExpenditure} date={date} setIncome={setIncome} searchResult={searchResult}></Feed>
      ):
      <p style={{marginTop:"2rem"}}>
        
        No Records been recorded yet.
      </p>
      }
    </main>
  )
}

export default RecordDisplay