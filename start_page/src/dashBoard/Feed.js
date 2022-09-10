import React from 'react'
import Record from './Record';

const Feed = ({records, setExpenditure,date}) => {
    //map each record

    var totalExpenditure=0;
    return (
    <>
        {records?.map(record=>(
            
            totalExpenditure+=record.money,
            setExpenditure(totalExpenditure),
            <Record key={record.id} record={record}/>
        ))}
    </>
    )
}

export default Feed