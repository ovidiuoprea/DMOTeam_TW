import React, { useState } from 'react'
import Button from './Button'
import CreateConference from './CreateConference'
import ShowAllArticles from './ShowAllArticles'
import ShowAllConferences from './ShowAllConferences'

const OrganizatorUI = ({user}) => {
  const [activePage,setActivePage]=useState();
  const [conferenceEditMode, setConferenceEditMode] = useState(false);
  const [conferenceToEdit, setConferenceToEdit] = useState(null);

  const CREATE_CONFERENCE_PAGE = 1;
  const SHOW_ALL_ARTICLES_PAGE = 2;
  const SHOW_CREATED_CONFERENCES = 3;

  const handleEditConference = (conference) => { 
    setConferenceEditMode(true);
    setConferenceToEdit(conference);
    setActivePage(CREATE_CONFERENCE_PAGE);
    console.log(conference)
  }
  const handleCreateConference = () => {
    setConferenceEditMode(false);
    setConferenceToEdit(null);
    setActivePage(CREATE_CONFERENCE_PAGE);
  }

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
            <Button text={"Creează o nouă conferință"} onClick={() => handleCreateConference()} />
            <Button text={"Starea articolelor"} onClick={() => setActivePage(SHOW_ALL_ARTICLES_PAGE)} />
            <Button text={"Vezi conferințele create"} onClick={() => setActivePage(SHOW_CREATED_CONFERENCES)} />

          </div>
        </div>
        <div className=''>
          {activePage===CREATE_CONFERENCE_PAGE && <CreateConference user={user} edit_mode={conferenceEditMode} conferenceToEdit={conferenceToEdit}/>}
          {activePage===SHOW_ALL_ARTICLES_PAGE && <ShowAllArticles show_all={true} reviewer_id={0}/>}
          {activePage===SHOW_CREATED_CONFERENCES && <ShowAllConferences user={user} onEdit={handleEditConference}/>}
        </div>
      </div>
    </div>
  )
}

export default OrganizatorUI