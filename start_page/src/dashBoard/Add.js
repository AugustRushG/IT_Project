import React, { useState }  from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
const ADD_URL = 'http://localhost:8080/api/records/add'



const Add= ()=> {
    const {auth} = useAuth();
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [money, setMoney] = useState('');
    const [description, setDescription] = useState('');

    
    const user = auth?.user;

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        try{
    
          const response = await axios.post(ADD_URL, JSON.stringify({user, date,category,money,description}),
            {
              headers:{'Content-Type':'application/json', 'Authorization':auth?.accessToken},
              withCredentials: true
            }
          );
    
          console.log(response.data);
          console.log(response.accessToken);
          console.log(JSON.stringify(response));
          

          
        }
        catch(error) {
            console.log(error)
          }
    }
    
    
      return (
        <section>
        <form onSubmit={handleSubmit}>
          <p>Add Record</p >
          <input
            type="date"
            name="date"
            placeholder="enter a date"
            onChange={(e)=>setDate(e.target.value)}
          />
          <input
            type="category"
            name="category"
            placeholder="enter a category"
            onChange={(e)=>setCategory(e.target.value)}
          />
         <input
            type="money"
            name="money"
            placeholder="enter money"
            onChange={(e)=>setMoney(e.target.value)}
          />
        <input
            type="description"
            name="description"
            placeholder="enter description"
            onChange={(e)=>setDescription(e.target.value)}
          />
          
          <button
            type="submit"
          >
            Submit
          </button>
        </form>
        </section>
      )
    }


export default Add