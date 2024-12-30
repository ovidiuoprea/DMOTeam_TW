import React, { useState } from 'react'
import Button from './Button'
import ShowAllArticles from './ShowAllArticles'
import ShowAllConferences from './ShowAllConferences'

const AutorUI = ({user}) => {
    const [activePage,setActivePage]=useState();
  
  
    const handleButtonClick = (page) => {
      setActivePage(page);
    };
  return (
    <div className=' pt-[80px] h-full w-full'>
      <div className='grid grid-cols-[2fr_4fr] h-full w-full max-lg:grid-cols-1 max-lg:h-fit'>
        <div className='bg-yellow-100 h-full w-full px-8 py-8'>
          <div className='mb-8'>
            <p className='text-2xl font-bold text-center'>Bine ai venit, <span className='text-blue-800'>{user.name}</span>  !</p>
            <p className='text-xl text-center'>Rolul tau: <span className='text-xl font-bold text-blue-800'>{user.role}</span></p>
          </div>
          <div className='text-lg indent-20'>
            <p>
              Ca autor, poți participa la conferințe, trimite propuneri de articole și colabora cu reviewerii pentru îmbunătățirea lucrărilor tale.
            </p>
            <p>
              Gestionează toate articolele tale și urmărește progresul lor într-un singur loc.
            </p>
          </div>
          <div className='justify-center flex flex-col gap-4 px-16 mt-10'>
            <Button text={"Vezi conferințele disponibile"} onClick={() => setActivePage(1)} />
            <Button text={" ..... "} onClick={() => setActivePage(2)} />
          </div>
        </div>
        <div className=''>
          {activePage===1 && <ShowAllConferences />}
          {activePage===2 && ""}
        </div>
      </div>
    </div>
  )
}

export default AutorUI