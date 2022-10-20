import React from 'react';
import rent from './categoryIcons/rent.png';
import medical from './categoryIcons/first-aid-kit.png';
import transport from './categoryIcons/transportation.png';
import shopping from './categoryIcons/online-shopping.png';
import pet from './categoryIcons/pet.png';
import gift from './categoryIcons/giftbox.png';
import income from './categoryIcons/money.png';
import other from './categoryIcons/unknown.png';
import salary from './categoryIcons/salary.png';
import partTime from './categoryIcons/part-time.png';
import investment from './categoryIcons/investment.png';
import useAuth from '../hooks/useAuth'
import axios from '../api/axios';
import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


import { BsXCircle,BsPencilSquare,BsFillFileEarmarkPostFill } from "react-icons/bs";



const EDIT_URL = '/api/records/edit'

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
    var aboAmount1=Number(aboAmount).toFixed(2);
    return `-$${aboAmount1}`;
  }
  var money1=Number(money).toFixed(2);
  return `$${money1}`
}

// function to choose Icon from to match the classification.
export const chooseIcon=(classification)=>{  
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



const Record = ({record,setRefresh}) => {
  const {auth} =useAuth();
  const [day, setDay] = useState('');
  const [category, setCategory] = useState('default');
  const [money, setMoney] = useState('');
  const [description, setDescription] = useState('');
  const [recordID, setRecordID] = useState('');
  const [image, setImage] = useState('');
  const user = auth?.user;
  const [show, setShow] = useState(false);
  const [imgShow, setImgShow] = useState(false);
  const [imgString,setImgString] = useState("");


  const checkDisabled=(day,money,category)=>{
    if (!day||!money||!category ){
      return false;
    }
    return true;
  }

  const handleEditSubmit = async(e)=>{
    e.preventDefault();
    try{
      const formData = new FormData();
      console.log(image);
      formData.append("recordID",recordID);
      formData.append("user",user);
      formData.append("day",day);
      formData.append("category",category);
      formData.append("money",money);
      formData.append("description",description);
      if(image){formData.append("image",image, image.name);}
      const response = await axios.post(EDIT_URL, formData,
        {
          headers:{'Content-Type':'multipart/form-data', 'Authorization':auth?.accessToken},
          withCredentials: true
        }
      );
      
      setRefresh(true);
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      alert("edit record successfully");

      
    }
    catch(error) {
        console.log(error)
        alert("edit record failed");
      }
}

  const showImg=()=> {
    setImgString(record.receipt.imageBase64);
    setImgShow(true);
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

  var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

  


  // function to translate the date into readable date.
  const translateDate=(date)=>{
    var dateSep= date.split(' ');
    return `${dateSep[1]} ${months[parseInt(dateSep[0])]}`;
  }



  const deleteRecord= async(id)=>{
    console.warn(id)
    const response = await axios.post('api/records/delete',JSON.stringify({id}),
    {headers:{'Content-Type': 'application/json', 'Authorization':auth?.accessToken},withCredentials: true});

    console.log(response.data);
    console.log(response.accessToken);
    console.log(JSON.stringify(response));
    alert("delete record successfully");

    setRefresh(true);


 }


 // function to highlight expenditure thats more than 1000 dollars
 const highlightMoney=(money)=>{
  var aboAmount;
  var isNegative=false;
  if (money<0){
    aboAmount=money*-1;
    isNegative=true;
  }
  
  if (isNegative){
    var aboAmount1=Number(aboAmount).toFixed(2);
    if (aboAmount>=1000) return <div id='highlight'>-${aboAmount1}</div>;
    return `-$${aboAmount1}`;
   
  }
  var money1=Number(money).toFixed(2);
  if (aboAmount>=1000) return <div id='highlight'>${money1}</div>;
  return `${money1}`
 }
 
  
  return (
    
    <div className='Record'>
          <div id='iconContainers'>
            <img src={chooseIcon(record.classification)} alt='img' id='recordIcons'/> 
          </div>
          <p className='RecordDetails'>  
            <span className='Date'>{translateDate(record.date)} </span> 
            <span className='Expenditure'>{highlightMoney(record.money)}</span>
            {/*if the length of notes less than 10 show all, if not show 10 and ...*/}
            <span className='Notes'>{(record.description)?.length<=20?record.description:`${(record.description)?.slice(0,20)}...`}</span>
                          
            <div id ='deleteContainer'>
              <BsXCircle onClick={()=>deleteRecord(record._id)} id='deleteImg'></BsXCircle>
            </div>
            <div id = 'editContainer'><BsPencilSquare onClick={()=>showPopup()} id='editImg'></BsPencilSquare></div>
          
            <div id = 'receiptContainer'>
              {record.receipt
              ? <BsFillFileEarmarkPostFill onClick={()=>showImg()} id='imageImg'></BsFillFileEarmarkPostFill>
              : <></> }
              
            </div>
          </p>
          <Modal show={show} onHide={()=>setShow(false)}>
          <Modal.Header closeButton>
          <Modal.Title>Wanna edit this one?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group >
          <form onSubmit={handleEditSubmit}>
          <p> Update Record</p >
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
            onChange={(e)=>setCategory(e.target.value)}
            >
          <option category={category} selected>{category}</option>
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
            placeholder="enter money"
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

          <input
            type="file"
            name="image"
            placeholder="Submit your receipt image if any"
            accept=".jpg, .jpeg, .png"
            onChange={(e)=>setImage(e.target.files[0])}
            
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


      <Modal show={imgShow} onHide={()=>setImgShow(false)}>
          <Modal.Header closeButton>
          <Modal.Title>This is the receipt</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <br />
        {imgString != null && <img src={`data:image;base64,${imgString}`} />}
          </Modal.Body>
      </Modal>
        

    
    </div>
  )
}

export default Record