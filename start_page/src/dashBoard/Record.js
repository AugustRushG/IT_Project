import React from 'react';
import { Link } from 'react-router-dom';
import rent from './categoryIcons/rent.png';
import medical from './categoryIcons/first-aid-kit.png';
import transport from './categoryIcons/transportation.png';
import shopping from './categoryIcons/online-shopping.png';
import pet from './categoryIcons/pet.png';
import gift from './categoryIcons/giftbox.png';
import useAuth from '../hooks/useAuth'

/**
 * Module Name: Record.js
 * Date of Creation: 06/09/2022
 * Creator: Hao Xu
 * Summary: A single record display.
 * Variable Accessed: useAuth.
 */

 export const translateMoney=(money)=>{
  var aboAmount;
  var isNegative=false;
  if (money<0){
    aboAmount=money*-1;
    isNegative=true;
  }
  
  if (isNegative){
    return `-$${aboAmount}`;
  }
  return `$${money}`
}



const Record = ({record}) => {
  const {auth} =useAuth();
  const userName=auth.user;

  // function to choose Icon from to match the classification.
  const chooseIcon=(classification)=>{  
      switch (classification){
        case 'rent':
          return rent;
        case 'transport':
          return transport;
        case 'medical':
          return medical;
        case 'shopping':
          return shopping;
        case 'pet':
          return pet;
        case 'gift':
          return gift;
        default:
          return null;
      }
  }


  // function to translate the date into readable date.
  const translateDate=(date)=>{
    var dateSep= date.split(' ');
    return `${dateSep[1]}/${[parseInt(dateSep[0])+1]}/${dateSep[2]}`;
  }

 
  
  return (
    
    <div className='Record'>
        <Link to={`/record/${userName}/${record.id}`}> 
          <img src={chooseIcon(record.classification)} alt='img'/> 
          <p className='RecordDetails'>  
            <span className='Date'>{translateDate(record.date)} </span> 
            <span className='Expenditure'>{translateMoney(record.money)}</span>
            {/*if the length of notes less than 10 show all, if not show 10 and ...*/}
            <span className='Notes'>{(record.description)?.length<=25?record.description:`${(record.description)?.slice(0,25)}...`}</span>
                           
          </p>
        </Link>
    </div>
  )
}

export default Record