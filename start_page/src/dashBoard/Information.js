import React from 'react'
import {FaSearch} from 'react-icons/fa'

const Information = () => {
    console.log("info");
  return (
    <div className='Information'>
        Main information area
        <form className='SearchForm' onSubmit={(e)=>e.preventDefault}>
            <label htmlFor='search'><FaSearch className='FaSearch' size={25}/></label>
            <input id='search' type='text' placeholder='Search Records'></input>
        </form>
    </div>
  )
}

export default Information