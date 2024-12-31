import { useEffect, useState } from "react";
import ShowAllArticlesForConference from "./ShowAllArticlesForConference";

const ConferenceUI = ( {conference_id} ) => {

  const [conference, setConference] = useState({});
  
  useEffect(() => {

    const fetchData = async()=>{
      try{
        const response = await fetch(process.env.REACT_APP_API_URL + `/conference-api/conference/${conference_id}`);
        if(!response.ok){
          throw new Error("fetch didnt work");
        }
        const result = await response.json();

        setConference(result);
      }
      catch(error){
        console.error(error.message); 
      }
    }
  fetchData();

}, [conference_id]);

  return (
    <div className=' pt-[80px] h-full w-full'>
      <div className='grid grid-cols-[2fr_4fr] h-full w-full max-lg:grid-cols-1 max-lg:h-fit'>
        <div className='bg-yellow-100 h-full w-full px-8 py-8'>
          <div className='mb-8'>
            <p className='text-2xl font-bold text-center'>Ești pe Conferința <span className='text-blue-800'>{conference ? conference.name : ""}</span>  !</p>
            <p className='text-xl text-center'>Detalii: <span className='text-xl font-bold text-blue-800'>{conference ? conference.description : ""}</span></p>
          </div>
          <div className='text-lg indent-20'>
            <p>
              Aici regăsești articole relevante într-un singur loc!
            </p>
          </div>
        </div>
        <div className=''>
          <ShowAllArticlesForConference conference_id = {conference_id}/>
        </div>
      </div>
    </div>
  )
}

export default ConferenceUI;