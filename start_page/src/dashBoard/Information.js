import React from 'react'
import {FaSearch} from 'react-icons/fa'

const Information = ({search},{setSearch}) => {
 
 
  

  return (
    <div className='Information'>
        Main information area
        <form className='SearchForm' onSubmit={(e)=>e.preventDefault}>
            <label htmlFor='search'><FaSearch className='FaSearch' size={25}/></label>
            <input id='search' type='text' placeholder='Search Records' value={search} onChange={(e)=>setSearch(e.target.value)} ></input>
        </form>
    </div>
  )
}

export default Information