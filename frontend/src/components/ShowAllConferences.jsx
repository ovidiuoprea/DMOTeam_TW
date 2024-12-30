import React, { useEffect, useState } from 'react'

const ShowAllConferences = () => {
  const[conferences,setConferences]=useState([]);

  useEffect(()=>{
    const fetchData=async ()=>{
      try{
        const response=await fetch(process.env.REACT_APP_API_URL + "/conference-api/conference");
        if(!response.ok){
          throw new Error("Problema la fetch");
        }
        const result =await response.json();
        console.log(result);
        setConferences(result);
      }
      catch(error){
        console.error(error.message); 
      }
    }

    fetchData();
  },[])

  return (
    <div className='flex flex-col px-16 py-8 gap-4'>
      {conferences.map((c)=>{
        return(
          <div className='bg-gray-200 rounded-md px-8 py-4'>
            {c.conference_id}
          </div>
        )
      })}

    </div>
  )
}

export default ShowAllConferences