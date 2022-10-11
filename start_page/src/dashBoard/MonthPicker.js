import React from 'react'
import { useState } from 'react';
import {BiDownArrow, BiUpArrow} from 'react-icons/bi'
import Picker from './mPicker';



/**
 * Module Name: MonthPicker.js
 * Date of Creation: 08/09/2022
 * Creator: Hao Xu
 * Summary: MonthPicker component so that user can pick specific month.
 * Variable Accessed: 
 */

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
        <div id='monthPickerContainer'>
        {showPicker?
            <>
            <BiUpArrow onClick={handleClick} id='arrow' /><Picker id='Picker' onChange={(date)=>{setDate(date);console.log("change date"+date);handleClick()}}/>
            </>
            :
            <BiDownArrow onClick={handleClick} id='arrow' ></BiDownArrow>
        }
        </div>
       
      </>
    );
}

export default MonthPicker