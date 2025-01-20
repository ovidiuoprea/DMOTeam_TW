import React, {useState } from 'react';
import NavBar from '../components/NavBar'
import OrganizatorUI from '../components/OrganizatorUI'
import { getCurrentAuthenticatedUser } from '../services/userService';
import AutorUI from '../components/AutorUI';
import ReviewerUI from '../components/ReviewerUI';
import NotLoggedInUI from '../components/NotLoggedInUI';

const HomePage = () => {
    const [user, setUser] = useState(getCurrentAuthenticatedUser());
  
  return (
    <div className='h-screen w-full '>
      <NavBar/> 
      {!user && <NotLoggedInUI/>}
      {(user && user.role==="Organizer") && <OrganizatorUI user={user} />}
      {(user && user.role==="Author") && <AutorUI user={user} />}
      {(user && user.role==="Reviewer") && <ReviewerUI user={user}/>}
    </div>
  )
}

export default HomePage