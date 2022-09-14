import React from 'react';
import Record from './Record';


const Feed = ({ setExpenditure,date, setIncome,searchResult}) => {

    var totalExpenditure=0;
    var totalIncome=0;
    var display=false;

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
       
        
        if (parseInt(record.date.substring(0,1))===date.getMonth()&&parseInt(record.date.substring(5,9))===date.getFullYear()){
            display=true;
            checkExpenditureOrIncome(record.money);
            setExpenditure(totalExpenditure);
            setIncome(totalIncome);
            
            return ( 
                <Record key={record.id} record={record}/>
            )  
        }

    }

    //if no records show no records been added this month.
    const checkDisplay=(display)=>{
        if (!display){
            setExpenditure(0);
            setIncome(0);
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