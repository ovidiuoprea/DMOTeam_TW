import React, { useEffect, useState } from 'react'
import { createConferenceAuthor } from '../services/conferenceAuthorService';

const ShowAllConferences = ({user}) => {
  const[conferences,setConferences]=useState([]);

  useEffect(()=>{
    const fetchData=async ()=>{
      try{
        const response=await fetch(process.env.REACT_APP_API_URL + `/conference-api/available-conferences/${user.user_id}`);
        if(!response.ok){
          throw new Error("Problema la fetch");
        }
        const result =await response.json();
        setConferences(result);
      }
      catch(error){
        console.error(error.message); 
      }
    }

    fetchData();
  },[conferences])

  const registerToConference= async (conference_id)=>{
    await createConferenceAuthor(conference_id,user.user_id);
  }

  return (
    <div className='flex flex-col px-16 py-8 gap-4'>
      {conferences.map((c)=>{
        return(
          <div className='bg-gray-200 flex rounded-md px-8 py-2 justify-between items-center'>
            <p>{c.conference_id}</p> 
            <p>Nume conferinta</p>
            <button
              className='bg-blue-800 text-white font-bold rounded-md px-4 py-2'
              onClick={()=>{registerToConference(c.conference_id)}}
            >
              Înscriere
            </button>
          </div>
        )
      })}

    </div>
  )
}

export default ShowAllConferences