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

  const [records, setRecord]=useState([{
    id: 1,
    date:  "July 01, 2021 11:17:36 AM",
    classificaiton: "rent",
    money: 5000,
    userid: userName
  },
  {
    id: 2,
    date:  "July 02, 2021 11:17:36 AM",
    classificaiton: "transport",
    money: 2000,
    userid: userName
  }])
 


  return (
    <>
      <Information search={search} setSearch={setSearch}></Information>
      <RecordDisplay records={records}></RecordDisplay>
    </>
  )
}

export default Dashboard