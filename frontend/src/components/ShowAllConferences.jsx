import React, { useEffect, useState } from 'react'
import { createConferenceAuthor } from '../services/conferenceAuthorService';
import { useNavigate } from 'react-router-dom';
import { getConferencesByOrganizerID } from '../services/conferenceService';
import CreateConference from './CreateConference';

const ShowAllConferences = ({user, onEdit}) => {
  const navigate = useNavigate();
  const[conferences,setConferences]=useState([]);

  useEffect(()=>{
    if(user.role === 'Organizer') { 
        const fetchData = async () => { 
            const result = await getConferencesByOrganizerID(user.user_id);
            if(result.conference) { 
                setConferences(result.conference);
            }
        }
        fetchData();
    }
    else {
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
    }
  }, [])

  const registerToConference= async (conference_id)=>{
    await createConferenceAuthor(conference_id,user.user_id);
  }

  const handleNavigation= async (conference_id)=>{
    await navigate(`/conference/${conference_id}`);
  }

  return (
    <div className='flex flex-col px-16 py-8 gap-4 overflow-auto h-screen-80'>
      {conferences.map((c)=>{
        return(
          <div className='bg-gray-200 flex rounded-md px-8 py-2 justify-between items-center'>
            <p>{c.conference_id}</p> 
            <p>{c.name ? c.name : "Nume conferinta***" }</p>
            <div className='flex gap-4'>
            {
                (user && user.role === "Author") ?
                (
                <button
                    className='bg-blue-800 text-white font-bold rounded-md px-4 py-2'
                    onClick={()=>{registerToConference(c.conference_id)}}>
                    Înscriere
                </button>
                ) : 
                (
                <button
                    className='bg-blue-800 text-white font-bold rounded-md px-4 py-2'
                    onClick={()=>{onEdit(c)}}
                    >
                    Editare
                </button>
                )
            }
            
            <button
              className='bg-green-800 text-white font-bold rounded-md px-4 py-2'
              onClick={()=>{handleNavigation(c.conference_id)}}
            >
              Acceseaza
            </button>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default ShowAllConferences