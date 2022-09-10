import React from 'react'
import { useState } from 'react';
import {BiDownArrow, BiUpArrow} from 'react-icons/bi'
import Picker from './mPicker';





const MonthPicker = ({setDate}) => {

    const[showPicker,setShowPicker]=useState(false);

    const handleClick=(e)=>{
        if (showPicker===true){
            setShowPicker(false);
        }
        else{
            setShowPicker(true);
        }
        
    }
 
    return (
      <>
        {showPicker?
            <>
            <BiUpArrow onClick={handleClick} id='arrow' size={25}/><Picker id='Picker' onChange={(date)=>{setDate(date);console.log("change date"+date);handleClick()}}/>
            </>
            :
            <BiDownArrow onClick={handleClick} id='arrow'  size={25}></BiDownArrow>
        }
       
      </>
    );
}

export default MonthPicker