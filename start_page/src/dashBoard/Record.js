import React from 'react';
import { Link } from 'react-router-dom';
import rent from './categoryIcons/rent.png';
import medical from './categoryIcons/first-aid-kit.png';
import transport from './categoryIcons/transportation.png';
import shopping from './categoryIcons/online-shopping.png';


const Record = ({record}) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];


  const chooseIcon=(classificaiton)=>{
    
      switch (classificaiton){
        case 'rent':
          return rent;
        case 'transport':
          return transport;
        case 'medical':
          return medical;
        case 'shopping':
          return shopping;
        default:
          return null;
      }
  }

  const translateDate=(date)=>{
    var dateSep= date.split(' ');
    return `${dateSep[1]}/${[parseInt(dateSep[0])+1]}/${dateSep[2]}`;
  }


  
  
  return (
    
    <div className='Record'>
        <Link to={`/record/${record.id}`}> 
          <img src={chooseIcon(record.classificaiton)} alt='img'/> 
          <p className='RecordDetails'>  
            <span className='Date'>{translateDate(record.date)} </span> 
            <span className='Expenditure'>${record.money}</span>
                           
          </p>
        </Link>
    </div>
  )
}

export default Record