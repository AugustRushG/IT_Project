import React from 'react'
import Feed from './Feed'

const RecordDisplay = ({records}) => {
  return (
    <main className='RecordDisplay'>
      <h3>Category Date Expenditure Notes</h3>
        
      {records.length?(
        <Feed records={records}></Feed>
      ):
      <p style={{marginTop:"2rem"}}>
        No Records been recorded yet.
      </p>
      }
    </main>
  )
}

export default RecordDisplay