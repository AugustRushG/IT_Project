import React, { useEffect } from 'react';
import Record from './Record';

/**
 * Module Name: Feed.js 
 * Date of Creation: 06/09/2022
 * Creator: Hao Xu
 * Summary: Function that helps to feed the records
 * Variable Accessed: 
 */

const Feed = ({ setExpenditure,date,setIncome,searchResult,records,setRefresh}) => {

    let totalExpenditure=0;
    let totalIncome=0;
    var display=false;

    useEffect(()=>{
        setExpenditure(totalExpenditure);
        setIncome(totalIncome);
    })

    // function to add to income and expenditure
    const checkExpenditureOrIncome=(money)=>{
        if (money<0){
            totalExpenditure+=money;
        }
        else{
            totalIncome+=money;
        }
    }
    
    // fucntion to only display records thats in the month.
    const checkMonth=(record)=>{ 
       
        if (parseInt(record.date.substring(0,2))===date.getMonth()&&parseInt(record.date.substring(6,10))===date.getFullYear()){
            display=true;
            checkExpenditureOrIncome(record.money);
            
            return ( 
                <Record key={record._id} record={record} setRefresh={setRefresh}/>
            )  
        }

    }

    //if no records show no records been added this month.
    const checkDisplay=(display)=>{
        if (!display){
            return (
            <p id='displayNone' style={{marginTop:"2rem"}}>
             No Records been recorded in this month.
            </p>)
            
        }
    }

   
    return (
    <>  
        {searchResult?.map(record=>(
            checkMonth(record))
            )
        }
        {checkDisplay(display)}
        
    </>
    )
}

export default Feed