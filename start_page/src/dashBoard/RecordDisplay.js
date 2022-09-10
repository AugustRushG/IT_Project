import React from 'react'
import Feed from './Feed'

const RecordDisplay = ({records,setExpenditure,date,setIncome}) => {
  return (
    <main className='RecordDisplay'>
      <h3>Category Date Money Notes</h3>
        
      {records.length?(
        <Feed records={records} setExpenditure={setExpenditure} date={date} setIncome={setIncome}></Feed>
      ):
      <p style={{marginTop:"2rem"}}>
        No Records been recorded yet.
      </p>
      }
    </main>
  )
}

export default RecordDisplay