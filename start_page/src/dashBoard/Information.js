import React from 'react'
import {FaSearch} from 'react-icons/fa'
import MonthPicker from './MonthPicker';
import {translateMoney} from './Record'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const ADD_URL = 'http://localhost:8080/api/records/add'

/**
 * Module Name: Information.js
 * Date of Creation: 27/08/2022
 * Creator: Hao Xu
 * Summary: A module that contains all necessary inforamtion that needs to display to the user.
 * Variable Accessed: 
 */

const Information = ({search,setSearch,date,setDate,expenditure,income}) => {
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
      window.location.reload();
      

      
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

  return (
    <>
      
      <div className='Information'>
        <h2 className='TimeDisplay'>
          {date.getFullYear()} <br/> {monthNames[date.getMonth()]}
          <MonthPicker setDate={setDate} />
        </h2>
        <h2 className='IncomeDisplay'>
          Income: <br/>${income}
        </h2>      
        <h2 className='ExpenditureDisplay'>
          Expenditure: <br/>{translateMoney(expenditure)}
        </h2>
        <h2 class="headertekst">
        <button onClick={()=>showPopup()}>
          Add
        </button>
        </h2>
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

    </>
  )
}

export default Information