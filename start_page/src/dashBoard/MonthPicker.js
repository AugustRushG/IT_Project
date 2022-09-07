import { faL } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react'
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
            <BiUpArrow onClick={handleClick}/><Picker id='Picker' onChange={(date)=>{setDate(date);console.log("change date"+date);handleClick()}}/>
            </>
            :
            <BiDownArrow onClick={handleClick}></BiDownArrow>
        }
       

      </>
    );
}

export default MonthPicker