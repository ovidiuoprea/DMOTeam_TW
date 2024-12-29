import React, {useState } from 'react';
import NavBar from '../components/NavBar'
import OrganizatorUI from '../components/OrganizatorUI'
import { getCurrentAuthenticatedUser } from '../services/userService';

const HomePage = () => {
    const [user, setUser] = useState(getCurrentAuthenticatedUser());
  
  return (
    <div className='h-screen w-full '>
      <NavBar/> 
      <OrganizatorUI user={user} />
    </div>
  )
}

export default HomePage