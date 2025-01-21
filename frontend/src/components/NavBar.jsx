import React, { useEffect, useState } from 'react';
import { getCurrentAuthenticatedUser, logout, updateUserRole } from '../services/userService';


const NavBar = () => {
    const [user, setUser] = useState(getCurrentAuthenticatedUser());
    const [role,setRole]=useState(user.role);

  return (
    <div className='w-full h-[80px] bg-gray-100 flex items-center justify-between px-8 fixed z-50'> 
      <div className='flex items-center'>
        <img src="/svg/articles.svg" height={50} width={50} alt='logo' onClick={()=>{window.location.href="/"}} style={{cursor: 'pointer'}}/>
        <p className='text-xl font-bold text-gray-700'>Review Conference Platform</p>
      </div>
      {
      !user && 
      <a className='flex items-center bg-gray-200 rounded-lg px-3 py-1 gap-2 cursor-pointer' href="/login">
        <span className="material-symbols-outlined text-[50px] text-gray-700">account_circle</span>
        <span className='text-grxlay-700 text-'>{user ? user.name : "Log in"}</span>
      </a> 
      }

    <div className='flex gap-1'>
      <div 
        className={'border-4 rounded-md bg-white p-2 '+(user.role==='Organizer'?'text-blue-800 border-blue-800 font-bold':"")}
        onClick={()=>{updateUserRole("Organizer");window.location.reload();}  }
      >
        Organizator</div>
      <div 
        className={'border-4 rounded-md bg-white p-2 '+(user.role==='Author'?'text-blue-800 border-blue-800 font-bold':"")}
        onClick={()=>{updateUserRole("Author");window.location.reload();}}
      >
        Autor
      </div>
      <div 
        className={'border-4 rounded-md bg-white p-2 '+(user.role==='Reviewer'?'text-blue-800 border-blue-800 font-bold':"")}
        onClick={()=>{updateUserRole("Reviewer");window.location.reload();}}
      >
        Reviewer
      </div>
    </div>  


      {
        user && 
        <a className='flex items-center bg-gray-200 rounded-lg px-3 py-1 gap-2 cursor-pointer' 
            onClick={()=> 
            {
                logout();
                window.location.reload();
            }}>
            <span className="material-symbols-outlined text-[50px] text-gray-700">account_circle</span>
            <span className='text-grxlay-700 text-'>{user ? user.name : "Log in"}</span>
        </a>
      }
      
    </div>
  )
}

export default NavBar