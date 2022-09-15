import React, { useEffect } from 'react'
import Information from './Information'
import RecordDisplay from './RecordDisplay'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'

/**
 * Module Name: Dashboard.js
 * Date of Creation: 27/08/2022
 * Creator: Hao Xu
 * Summary: Dashboard page for user, most of the functionality is here
 * Variable Accessed: 
 */

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
  const [records, setRecord]=useState([{
    id: 1,
    date:  "8 08 2022",
    classificaiton: "rent",
    money: +5000,
    notes: "rent monthly",
    userid: userName
  },
  {
    id: 2,
    date:  "6 02 2021",
    classificaiton: "transport",
    money: -2000,
    notes: "myki charge",
    userid: userName
  },
  {
    id: 3,
    date:  "8 02 2022",
    classificaiton: "shopping",
    money: -2000,
    notes: "bought a new ps5",
    userid: userName
  },
  {
    id:4,
    date:  "8 02 2022",
    classificaiton: "medical",
    money: -2000,
    userid: userName
  },
  {
    id: 5,
    date:  "8 02 2022",
    classificaiton: "transport",
    money: 2000,
    userid: userName
  },
  {
    id: 6,
    date:  "8 02 2022",
    classificaiton: "transport",
    money: 4000,
    userid: userName
  },
  {
    id: 7,
    date:  "8 02 2022",
    classificaiton: "transport",
    money: -2000,
    notes: "myki charge",
    userid: userName
  },
  {
    id: 8,
    date:  "8 02 2022",
    classificaiton: "transport",
    money: -2000,
    notes: "myki charge",
    userid: userName
  },
  {
    id: 9,
    date:  "8 02 2022",
    classificaiton: "transport",
    money: -2000,
    notes: "myki charge",
    userid: userName
  },
  {
    id: 10,
    date:  "8 02 2022",
    classificaiton: "transport",
    money: -2000,
    notes: "myki charge",
    userid: userName
  },
  {
    id: 11,
    date:  "8 02 2022",
    classificaiton: "transport",
    money: -2000,
    notes: "myki charge",
    userid: userName
  },
  {
    id: 12,
    date:  "8 02 2022",
    classificaiton: "transport",
    money: -2000,
    notes: "myki charge",
    userid: userName
  },
  {
    id: 13,
    date:  "8 02 2022",
    classificaiton: "transport",
    money: -2000,
    notes: "myki charge",
    userid: userName
  },
  {
    id: 14,
    date:  "8 02 2022",
    classificaiton: "transport",
    money: -2000,
    notes: "myki charge",
    userid: userName
  },
  {
    id: 15,
    date:  "8 02 2022",
    classificaiton: "transport",
    money: -2000,
    notes: "myki charge",
    userid: userName
  }

  ])

  //filter the records according to the searchResult
  useEffect(()=>{
    const filteredResults=records.filter((record)=>
    ((record.notes)?.toLowerCase())?.includes(search?.toLowerCase())
    ||((record.classificaiton)?.toLowerCase())?.includes(search?.toLowerCase()));

    setSearchResult(filteredResults);
  },[records,search])
 


  return (
    <>
      <Information search={search} setSearch={setSearch} date={date} setDate={setDate} expenditure={expenditure} income={income}></Information>
      <RecordDisplay records={records} setExpenditure={setExpenditure} date={date} setIncome={setIncome} searchResult={searchResult} ></RecordDisplay>
    </>
  )
}

export default Dashboard