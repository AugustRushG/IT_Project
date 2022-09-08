import React from 'react'
import {FaSearch} from 'react-icons/fa'
import MonthPicker from './MonthPicker';
import { useState } from 'react';


const Information = ({search,setSearch}) => {
  // to display month in string 
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  // get current date
  const [date,setDate]=useState(new Date());
  //console.log("date now is "+date.getFullYear()+','+date.getMonth())

  return (
    <>
      
      <div className='Information'>
        <h2 className='TimeDisplay'>
          {date.getFullYear()} <br/> {monthNames[date.getMonth()]}
          <MonthPicker setDate={setDate} />
        </h2>
        <h2 className='IncomeDisplay'>
          Income: <br/>$200
        </h2>      
        <h2 className='ExpenditureDisplay'>
          Expenditure: <br/>$0
        </h2>
      </div>
      <form className='SearchForm' onSubmit={(e)=>e.preventDefault}>
        <label htmlFor='search'><FaSearch className='FaSearch' size={25}/></label>
        <input id='search' type='text' placeholder='Search Records' value={search} onChange={(e)=>setSearch(e.target.value)} ></input>
      </form>

    </>
  )
}

export default Information