import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { useState } from 'react'

const Information = ({search},{setSearch}) => {

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  
  const [date, setDate]=useState(new Date());

 
 
  

  return (
    <>
      
      <div className='Information'>
        <h2 className='TimeDisplay'>
          {date.getFullYear()} <br/> {monthNames[date.getMonth()]}
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