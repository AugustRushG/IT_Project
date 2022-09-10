import React from 'react'
import Record from './Record';

const Feed = ({records, setExpenditure,date, setIncome}) => {
    //map each record

    var totalExpenditure=0;
    var totalIncome=0;

    const checkExpenditureOrIncome=(money)=>{
        if (money<0){
            totalExpenditure+=money;
        }
        else{
            totalIncome+=money;
        }
    }
  
    const checkMonth=(record)=>{ 
        
        if (parseInt(record.date.substring(0,1))===date.getMonth()){
            console.log("trues");
            return ( 
                checkExpenditureOrIncome(record.money),
                setExpenditure(totalExpenditure),
                setIncome(totalIncome),
                <Record key={record.id} record={record}/>)
        }
    }

    return (
    <>
        {records?.map(record=>(
            checkMonth(record))
        )}
    </>
    )
}

export default Feed