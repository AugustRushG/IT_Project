import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { GrAdd} from "react-icons/gr";
import MonthPicker from './MonthPicker';
import {translateMoney} from './Record'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useMediaQuery } from 'react-responsive'

const ADD_URL = 'http://localhost:8080/api/records/add'

/**
 * Module Name: Information.js
 * Date of Creation: 27/08/2022
 * Creator: Hao Xu
 * Summary: A module that contains all necessary inforamtion that needs to display to the user.
 * Variable Accessed: 
 */

const Information = ({search,setSearch,date,setDate,expenditure,income,setRefresh}) => {
  // to display month in string 
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  const [show, setShow] = useState(false);
  const {auth} = useAuth();
  const [day, setDay] = useState('');
  const [category, setCategory] = useState('default');
  const [money, setMoney] = useState('');
  const [description, setDescription] = useState('');
  const user = auth?.user;
  const checkDisabled=(day,money,category)=>{
    if (!day||!money||!category ){
      return false;
    }
    return true;
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    try{

      const response = await axios.post(ADD_URL, JSON.stringify({user, day,category,money,description}),
        {
          headers:{'Content-Type':'application/json', 'Authorization':auth?.accessToken},
          withCredentials: true
        }
      );

      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));

      setRefresh(true);
      
      

      
    }
    catch(error) {
        console.log(error)
      }
}

  const showPopup=()=> {
    setShow(true);
  }

  // get current date
 
  //console.log("date now is "+date.getFullYear()+','+date.getMonth())

  const isMobile = useMediaQuery({ query: '(max-width: 450px)' })

  return (
    <>
      
      <div className='Information'>
        <h2 className='TimeDisplay'>
          {date.getFullYear()} {!isMobile&&<br/>} {monthNames[date.getMonth()]}
          <MonthPicker setDate={setDate}/>
        </h2>
        <h2 className='IncomeDisplay'>
          Income: {!isMobile&&<br/>}{translateMoney(income)}
        </h2>      
        <h2 className='ExpenditureDisplay'>
          Expenditure: {!isMobile&&<br/>}{translateMoney(expenditure)}
        </h2>
           
        <div id='addContainer'>
          <GrAdd onClick={()=>showPopup()} className='addButton'/>
        </div>
         
        
      </div>
      <form className='SearchForm' onSubmit={(e)=>e.preventDefault}>
        <label htmlFor='search'><FaSearch className='FaSearch' size={25}/></label>
        <input id='search' type='text' placeholder='Search Records' value={search} onChange={(e)=>setSearch(e.target.value)} ></input>
      </form>

      <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Start adding a new record!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group >
        <form onSubmit={handleSubmit}>
          <p> Add a Record</p >
          <input
            type="date"
            name="date"
            value={day}
            placeholder="enter a date"
            onChange={(e)=>setDay(e.target.value)}
            
            
          />
          <br></br>
        <select  
            type="category"
            name="category" 
            value={category}
            defaultValue={category}
            onChange={(e)=>setCategory(e.target.value)}>
          <option category="default" hidden>select a category</option>
          <option category="rent">rent</option>
          <option category="transport">transport</option>
          <option category="medical">medical</option>
          <option category="shopping">shopping</option>
          <option category="shopping">pet</option>
          <option category="shopping">gift</option>
          <option category="other">other</option>
        </select>

        <br></br>

         <input
            type="number"
            name="money"
            value={money}
            placeholder="enter money, negative if it's an expenditure"
            onChange={(e)=>setMoney(e.target.value)}
          />

        <br></br>
        <input
            type="description"
            name="description"
            value={description}
            placeholder="leave a quick note if any"
            onChange={(e)=>setDescription(e.target.value)}
            
          />
        <br></br>
        {checkDisabled(day,category,money)?
          <button type="submit"  onClick={()=>setShow(false)}>Submit</button>
        :
        <button type="submit" disabled onClick={()=>setShow(false)}>Submit</button>}
        </form> 
          </Form.Group>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default Information