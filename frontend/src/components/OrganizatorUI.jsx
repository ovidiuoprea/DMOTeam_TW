import React, { useState } from 'react'
import Button from './Button'
import CreateConference from './CreateConference'
import ShowAllArticles from './ShowAllArticles'

const OrganizatorUI = ({user}) => {
  const [activePage,setActivePage]=useState();


  const handleButtonClick = (page) => {
    setActivePage(page);
  };
  return (
    <div className=' pt-[80px] h-full w-full'>
      <div className='grid grid-cols-[2fr_4fr] h-full w-full max-lg:grid-cols-1 max-lg:h-fit'>
        <div className='bg-yellow-100 h-full w-full px-8 py-8'>
          <div className='mb-8'>
            <p className='text-2xl font-bold text-center'>Bine ai venit, <span className='text-blue-800'>{user ? user.name : ""}</span>  !</p>
            <p className='text-xl text-center'>Rolul tau: <span className='text-xl font-bold text-blue-800'>{user ? user.role : ""}</span></p>
          </div>
          <div className='text-lg indent-20'>
            <p>
              Ca organizator, poți crea și gestiona conferințe, aloca revieweri pentru fiecare sesiune și urmări progresul evaluărilor.
            </p>
            <p>
              Găsește și administrează toate conferințele tale într-un singur loc.
            </p>
          </div>
          <div className='justify-center flex flex-col gap-4 px-16 mt-10'>
            <Button text={"Creează o nouă conferință"} onClick={() => setActivePage(1)} />
            <Button text={"Starea articolelor"} onClick={() => setActivePage(2)} />
          </div>
        </div>
        <div className=''>
          {activePage===1 && <CreateConference user={user}/>}
          {activePage===2 && <ShowAllArticles/>}
        </div>
      </div>
    </div>
  )
}

export default OrganizatorUI