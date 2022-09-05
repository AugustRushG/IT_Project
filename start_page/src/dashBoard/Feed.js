import React from 'react'
import Record from './Record';

const Feed = ({records}) => {
    //map each record

    return (
    <>
        {records?.map(record=>(
            <Record key={record.id} record={record}/>
        ))}
    </>
    )
}

export default Feed