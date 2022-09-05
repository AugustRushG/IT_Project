import React from 'react'
import { Link } from 'react-router-dom'

const Record = ({record}) => {
  return (
    <div>
        <Link to={`/record/${record.id}`}>
            <h2>{record.classification}</h2>
            <p>{record.date} {record.money}</p>
        </Link>
    </div>
  )
}

export default Record