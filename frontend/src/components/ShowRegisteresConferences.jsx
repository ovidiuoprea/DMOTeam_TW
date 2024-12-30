import React, { use, useEffect, useState } from 'react'
import { getConferencesForAuthor } from '../services/conferenceService';
import {deleteConferenceAuthor} from '../services/conferenceAuthorService';

const ShowRegisteresConferences = ({user}) => {
  const[conferences,setConferences]=useState([]);

  useEffect(()=>{
    const fetchConferences=async ()=>{
      const data = await getConferencesForAuthor(user.user_id);
      setConferences(data);
    }
    fetchConferences();
  },[])

  const unregisterFromConference=async (ca_id)=>{
      await deleteConferenceAuthor(ca_id);
      
      setConferences((prevConferences) => 
        prevConferences.filter((conference) => conference.ca_id !== ca_id)
      );
  }

  return (
    <div className='flex flex-col px-16 py-8 gap-4'>
      {conferences.map((c)=>{
        return(
          <div className='bg-gray-200 flex rounded-md px-8 py-2 justify-between items-center'>
            <p>{c.conference_id}</p> 
            <p>Nume conferinta</p>
            <button
              className='bg-red-800 text-white font-bold rounded-md px-4 py-2'
              onClick={()=>unregisterFromConference(c.ca_id)}
            >
              Anulare înscriere
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default ShowRegisteresConferences