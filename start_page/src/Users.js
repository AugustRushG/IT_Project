import React from 'react'
import { useState, useEffect } from 'react';
import axios from './api/axios';

const Users = () => {
    const [users,setUsers]=useState();

    useEffect(()=>{
        let isMounted=true;
        const controller=new AbortController();

        const getUsers=async()=>{
            try{
                const response = await axios.get('')
            }catch(err){

            }
        }
    },[])

  return (
    <article>
        <h2>Users list</h2>
        {users?.length
        ?(
            <ul>
                {users.map((user,i)=><li key={i}>{user?.username}</li>)}
            </ul>
        ):<p>No users display </p>}
    </article>
  )
}

export default Users