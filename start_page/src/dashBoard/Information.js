import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { GrAdd} from "react-icons/gr";
import MonthPicker from './MonthPicker';
import {translateMoney} from './Record'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useMediaQuery } from 'react-responsive'

const ADD_URL = 'api/records/add'

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
  const [incomeShow, setIncomeShow] = useState(false);
  const [expenseShow, setExpenseShow] = useState(false);
  const {auth} = useAuth();
  const [day, setDay] = useState('');
  const [category, setCategory] = useState('default');
  const [money1, setMoney1] = useState();
  var money;

  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const user = auth?.user;
  const checkDisabled=(day,money1,category)=>{
    if (!day||!money1||!category ){
      return false;
    }
    return true;
  }





  const handleExpenseSubmit = async(e)=>{
    e.preventDefault();
    money = -1 * money1;
    try{
      const formData = new FormData();
      formData.append("user",user);
      formData.append("day",day);
      formData.append("category",category);
      formData.append("money",money);
      formData.append("description",description);
      if(image){formData.append("image",image, image.name);}
      setDay('');
      setMoney1();
      setCategory('default');
      setDescription('');
      setImage('');
      
      const response = await axios.post(ADD_URL, formData,
        {
          headers:{'Content-Type':'multipart/form-data', 'Authorization':auth?.accessToken},
          withCredentials: true
        }
      );

      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      alert("add record successfully");

      setRefresh(true);
      
      

      
    }
    catch(error) {
        console.log(error)
        alert("add record failed");
      }
}

  const handleIncomeSubmit = async(e)=>{
    e.preventDefault();
    money = 1 * money1;
    
    try{
      const formData = new FormData();
      formData.append("user",user);
      formData.append("day",day);
      formData.append("category",category);
      formData.append("money",money);
      formData.append("description",description);
      if(image){formData.append("image",image, image.name);}

      setDay('');
      setMoney1();
      setCategory('default');
      setDescription('');
      setImage('');
      const response = await axios.post(ADD_URL, formData,
        {
          headers:{'Content-Type':'multipart/form-data', 'Authorization':auth?.accessToken},
          withCredentials: true
        }
      );

      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      alert("add record successfully");

      setRefresh(true);
      
      

      
    }
    catch(error) {
        console.log(error);
        alert("add record failed");
      }
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
        <div className='ExpenseAdd'>expense</div>
        <h2 id='addContainer'> 
          <GrAdd onClick={()=>setExpenseShow(true)} className='addButton'/>
        </h2> 
        <div className='IncomeAdd'>income</div>
        <h2 id='incomeContainer'> 
          <GrAdd onClick={()=>setIncomeShow(true)} className='addButton'/>
        
        </h2>
         
        
      </div>
      <form className='SearchForm' onSubmit={(e)=>e.preventDefault}>
        <label htmlFor='search'><FaSearch className='FaSearch' size={25}/></label>
        <input id='search' type='text' placeholder='Search Records' value={search} onChange={(e)=>setSearch(e.target.value)} ></input>
      </form>

      <Modal show={incomeShow} onHide={()=>setIncomeShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Start adding a new income!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group >
        <form onSubmit={handleIncomeSubmit}>
          <p> Add an income</p >
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
          <option category='salary'>salary</option>
          <option category='investment'>investment</option>
          <option category='partTime'>partTime</option>
          <option category="other">other</option>
        </select>

        <br></br>

         <input
            type="number"
            name="money"
            value={money1}
            placeholder="enter money"
            onChange={(e)=>setMoney1(e.target.value)}
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
        <input
            type="file"
            name="image"
            placeholder="Submit your receipt image if any"
            accept=".jpg, .jpeg, .png"
            onChange={(e)=>setImage(e.target.files[0])}
            
          />
        <br></br>
        {checkDisabled(day,category,money1)?
          <button type="submit"  onClick={()=>setIncomeShow(false)}>Submit</button>
        :
        <button type="submit" disabled onClick={()=>setIncomeShow(false)}>Submit</button>}
        </form> 
          </Form.Group>
        </Modal.Body>
      </Modal>

      <Modal show={expenseShow} onHide={()=>setExpenseShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Start adding a new expense!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group >
        <form onSubmit={handleExpenseSubmit}>
          <p> Add an expense</p >
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
            value={money1}
            placeholder="enter money"
            onChange={(e)=>setMoney1(e.target.value)}
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

        <input
            type="file"
            name="image"
            placeholder="Submit your receipt image if any"
            accept=".jpg, .jpeg, .png"
            onChange={(e)=>setImage(e.target.files[0])}
            
          />
        <br></br>
        {checkDisabled(day,category,money1)?
          <button type="submit"  onClick={()=>setExpenseShow(false)}>Submit</button>
        :
        <button type="submit" disabled onClick={()=>setExpenseShow(false)}>Submit</button>}
        </form> 
          </Form.Group>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default Information