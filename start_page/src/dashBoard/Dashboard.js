import React, { useEffect } from 'react'
import Information from './Information'
import RecordDisplay from './RecordDisplay'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PieChart from './PieChart'
import VerticalBarChart from './VerticalBarChart'
import axios from '../api/axios'

/**
 * Module Name: Dashboard.js
 * Date of Creation: 27/08/2022
 * Creator: Hao Xu
 * Summary: Dashboard page for user, most of the functionality is here
 * Variable Accessed: 
 */

const GET_URL='api/records/dashboard';

const Dashboard = () => {
  
  //get username
  const {auth} =useAuth();
 
  const userName=auth.user;
  

  const [search, setSearch]=useState('');
  const [searchResult, setSearchResult]=useState([]);


  const [expenditure, setExpenditure]=useState('');
  const [income, setIncome]=useState('');

  //set and get date
  const [date,setDate]=useState(new Date());
  const [records, setRecord]=useState([]);



  //filter the records according to the searchResult
  useEffect(()=>{

  
    const filteredResults=records?.filter((record)=>
    ((record.notes)?.toLowerCase())?.includes(search?.toLowerCase())
    ||((record.classification)?.toLowerCase())?.includes(search?.toLowerCase()));

    setSearchResult(filteredResults);

    if (filteredResults.length===0){
      setSearchResult(records);
      console.log(searchResult);
    }
 
  },[records,search])


  useEffect(()=>{
    const fetchRecords=async()=>{
      try{
        const response=await axios.get(GET_URL,{headers:{
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization' : JSON.parse(localStorage.getItem('accessToken'))}
          }
        )

        console.log(response);
        setRecord(response.data.data);
        
      }catch(err){
          console.error(err);
      }
    }

    fetchRecords();
  },[])
 


  return (
    <>
      <Information search={search} setSearch={setSearch} date={date} setDate={setDate} expenditure={expenditure} income={income}></Information>
      <h2 class="headertekst">
        <span className='line'><Link to='/Add'>add</Link></span>
        
      </h2>
      <RecordDisplay records={records} setExpenditure={setExpenditure} date={date} setIncome={setIncome} searchResult={searchResult} ></RecordDisplay>
      <div className='PieChartBackGround'> </div>
      <div className='PieChartContainer'> <PieChart></PieChart></div>
      <div className='VerticalBarChartBackground'> </div>
      <div className='VerticalBarChartContainer'><VerticalBarChart></VerticalBarChart></div>
     
     
    </>
  )
}

export default Dashboard