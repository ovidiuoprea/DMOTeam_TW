import React, {useState } from 'react';
import NavBar from '../components/NavBar'
import OrganizatorUI from '../components/OrganizatorUI'
import { getCurrentAuthenticatedUser } from '../services/userService';
import AutorUI from '../components/AutorUI';

const HomePage = () => {
    const [user, setUser] = useState(getCurrentAuthenticatedUser());
  
  return (
    <div className='h-screen w-full '>
      <NavBar/> 
      {/* {user.role==="Organizer" && <OrganizatorUI user={user} />}
      {user.role==="Author" && <AutorUI user={user} />} */}
      <AutorUI user={user} />  
      {/* <OrganizatorUI user={user}/> */}
    </div>
  )
}

export default HomePage