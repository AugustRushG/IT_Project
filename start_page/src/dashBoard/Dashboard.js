import React from 'react'
import Information from './Information'
import RecordDisplay from './RecordDisplay'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'

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
    date:  "8 08 2021",
    classificaiton: "rent",
    money: +5000,
    userid: userName
  },
  {
    id: 2,
    date:  "6 02 2021",
    classificaiton: "transport",
    money: -2000,
    userid: userName
  },
  {
    id: 3,
    date:  "8 02 2021",
    classificaiton: "shopping",
    money: -2000,
    userid: userName
  },
  {
    id:4,
    date:  "8 02 2021",
    classificaiton: "medical",
    money: -2000,
    userid: userName
  },
  {
    id: 5,
    date:  "6 02 2021",
    classificaiton: "transport",
    money: 2000,
    userid: userName
  },
  {
    id: 6,
    date:  "6 02 2021",
    classificaiton: "transport",
    money: 4000,
    userid: userName
  },
  ])
 


  return (
    <>
      <Information search={search} setSearch={setSearch} date={date} setDate={setDate} expenditure={expenditure} income={income}></Information>
      <RecordDisplay records={records} setExpenditure={setExpenditure} date={date} setIncome={setIncome}></RecordDisplay>
    </>
  )
}

export default Dashboard