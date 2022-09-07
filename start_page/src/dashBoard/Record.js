import React from 'react';
import { Link } from 'react-router-dom';
import rent from './categoryIcons/rent.png';
import medical from './categoryIcons/first-aid-kit.png';
import transport from './categoryIcons/transportation.png';
import shopping from './categoryIcons/online-shopping.png';


const Record = ({record}) => {

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


  
  
  return (
    
    <div className='Record'>
        <Link to={`/record/${record.id}`}> 
          <p>
            <img src={chooseIcon(record.classificaiton)} alt='img'/> 
            <p className='RecordDetails'>
              {record.date}  ${record.money}
            </p>
            
           
          </p>
        </Link>
    </div>
  )
}

export default Record