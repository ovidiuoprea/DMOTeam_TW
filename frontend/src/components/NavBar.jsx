import React from 'react'

const NavBar = () => {
  return (
    <div className='w-full h-[80px] bg-gray-100 flex items-center justify-between px-8'> 
      <div className='flex items-center'>
        <img src="/svg/articles.svg" height={50} width={50} alt='logo' />
        <p className='text-xl font-bold text-gray-700'>Review Conference Platform</p>
      </div>
      <div className='flex items-center bg-gray-200 rounded-lg px-3 py-1 gap-2 cursor-pointer'>
        <span class="material-symbols-outlined text-[50px] text-gray-700">account_circle</span>
        <span className='text-grxlay-700 text-'>*username*</span>
      </div>
        
    </div>
  )
}

export default NavBar