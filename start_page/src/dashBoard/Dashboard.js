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

  //set and get date
  const [date,setDate]=useState(new Date());
  const [records, setRecord]=useState([{
    id: 1,
    date:  "July 01, 2021",
    classificaiton: "rent",
    money: 5000,
    userid: userName
  },
  {
    id: 2,
    date:  "July 02, 2021",
    classificaiton: "transport",
    money: 2000,
    userid: userName
  },
  {
    id: 3,
    date:  "July 02, 2021",
    classificaiton: "shopping",
    money: 2000,
    userid: userName
  },
  {
    id:4,
    date:  "July 02, 2021",
    classificaiton: "medical",
    money: 2000,
    userid: userName
  },
  {
    id: 5,
    date:  "July 02, 2021",
    classificaiton: "transport",
    money: 2000,
    userid: userName
  },
  {
    id: 6,
    date:  "July 02, 2021",
    classificaiton: "transport",
    money: 4000,
    userid: userName
  },
  ])
 


  return (
    <>
      <Information search={search} setSearch={setSearch} date={date} setDate={setDate} expenditure={expenditure}></Information>
      <RecordDisplay records={records} setExpenditure={setExpenditure} date={date}></RecordDisplay>
    </>
  )
}

export default Dashboard