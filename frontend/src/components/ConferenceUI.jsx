import { useEffect, useState } from "react";
import ShowAllArticlesForConference from "./ShowAllArticlesForConference";

import Button from './Button';

const ConferenceUI = ( {conference_id} ) => {

  const [conference, setConference] = useState({});
  const [activePage,setActivePage]=useState(1);
  
  const SHOW_ARTICLES = 1;
  const ADD_ARTICLE = 2;
  
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
          <div className='justify-center flex flex-col gap-4 px-16 mt-10'>
            <Button text={"Arata articole curente"} onClick={() => setActivePage(SHOW_ARTICLES)} />
            <Button text={"Adauga articol nou"} onClick={() => setActivePage(ADD_ARTICLE)} />
          </div>
        </div>
        <div className=''>
          {activePage===SHOW_ARTICLES && <ShowAllArticlesForConference conference_id = {conference_id} />}
          {activePage===ADD_ARTICLE && <div>asdfas</div>}
        </div>
      </div>
    </div>
  )
}

export default ConferenceUI;