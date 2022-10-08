import React from 'react';
import rent from './categoryIcons/rent.png';
import medical from './categoryIcons/first-aid-kit.png';
import transport from './categoryIcons/transportation.png';
import shopping from './categoryIcons/online-shopping.png';
import pet from './categoryIcons/pet.png';
import gift from './categoryIcons/giftbox.png';
import income from './categoryIcons/money.png';
import other from './categoryIcons/unknown-mail.png';
import salary from './categoryIcons/salary.png';
import partTime from './categoryIcons/part-time.png';
import investment from './categoryIcons/investment.png';
import useAuth from '../hooks/useAuth'
import axios from '../api/axios';
import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const EDIT_URL = 'http://localhost:8080/api/records/edit'

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
  const [day, setDay] = useState('');
  const [category, setCategory] = useState('default');
  const [money, setMoney] = useState('');
  const [description, setDescription] = useState('');
  const [recordID, setRecordID] = useState('');
  const user = auth?.user;
  const [show, setShow] = useState(false);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    try{

      const response = await axios.post(EDIT_URL, JSON.stringify({recordID,user, day,category,money,description}),
        {
          headers:{'Content-Type':'application/json', 'Authorization':auth?.accessToken},
          withCredentials: true
        }
      );

      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      window.location.reload();

      
    }
    catch(error) {
        console.log(error)
      }
}

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
        case 'income':
          return income;
        case 'salary':
          return salary;
        case 'investment':
          return investment;
        case 'partTime':
          return partTime;
       
        default:
          return other;
      }
  }

  const showPopup=()=> {
    var dateSep= record.date.split(' ');
    setRecordID(record._id);
    setDay(`${dateSep[2]}-${dateSep[0]}-${dateSep[1]}`);
    setCategory(record.classification);
    setMoney(record.money);
    setDescription(record.description);
    setShow(true);

    console.log(  `${dateSep[2]}-${dateSep[0]}-${dateSep[1]}`);

  }


  // function to translate the date into readable date.
  const translateDate=(date)=>{
    var dateSep= date.split(' ');
    return `${dateSep[1]}/${[parseInt(dateSep[0])+1]}/${dateSep[2]}`;
  }



  const deleteRecord= async(id)=>{
    console.warn(id)
    const response = await axios.post('api/records/delete',JSON.stringify({id}),
    {headers:{'Content-Type': 'application/json', 'Authorization':auth?.accessToken},withCredentials: true});

    console.log(response.data);
    console.log(response.accessToken);
    console.log(JSON.stringify(response));
    window.location.reload();


 }

 
  
  return (
    
    <div className='Record'>

          <img src={chooseIcon(record.classification)} alt='img'/> 
          <p className='RecordDetails'>  
            <span className='Date'>{translateDate(record.date)} </span> 
            <span className='Expenditure'>{translateMoney(record.money)}</span>
            {/*if the length of notes less than 10 show all, if not show 10 and ...*/}
            <span className='Notes'>{(record.description)?.length<=25?record.description:`${(record.description)?.slice(0,25)}...`}</span>
                           
          
          <span className='Operation'>
          <button onClick={()=>deleteRecord(record._id)}>delete</button>
          <button onClick={()=>showPopup()}>Edit</button>
          </span>
          </p>

          <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Wanna edit this one?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group >
        <form onSubmit={handleSubmit}>
          <p> Update Record</p >
          <input
            type="date"
            name="date"
            value={day}
            placeholder="enter a date"
            onChange={(e)=>setDay(e.target.value)}
            
          />
        <select  
            type="category"
            name="category" 
            value={category}
            onChange={(e)=>setCategory(e.target.value)}>
          <option category={category} selected>{category}</option>
          <option category="rent">rent</option>
          <option category="transport">transport</option>
          <option category="medical">medical</option>
          <option category="shopping">shopping</option>
          <option category="shopping">pet</option>
          <option category="shopping">gift</option>
          <option category="other">other</option>
        </select>

         <input
            type="money"
            name="money"

            value={money}
            placeholder="enter money"
            onChange={(e)=>setMoney(e.target.value)}
          />
        <input
            type="description"
            name="description"

            value={description}
            placeholder="leave a quick note if any"
            onChange={(e)=>setDescription(e.target.value)}
          />
          
          <button
            type="submit" onClick={()=>setShow(false)}
          >
            Submit
          </button>
        </form> 
          </Form.Group>
        </Modal.Body>
      </Modal>
        

    
    </div>
  )
}

export default Record