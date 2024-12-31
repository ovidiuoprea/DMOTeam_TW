import React from 'react'

const Review = () => {
  return (
    <div className='w-full h-fit bg-gray-400 rounded-lg p-2'>
      <div className='flex items-center'>
        <span className="material-symbols-outlined text-[40px]">account_circle</span>
        <p className='text-lg'>*Reviewer name*</p>
      </div>
      <div className='pl-8'>
        <span className="material-symbols-outlined text-[25px] text-yellow-500">star</span>
        <span className="material-symbols-outlined text-[25px] text-yellow-500">star</span>
        <span className="material-symbols-outlined text-[25px] text-yellow-500">star</span>
        <span className="material-symbols-outlined text-[25px] text-yellow-500">star</span>
        <span className="material-symbols-outlined text-[25px] text-yellow-500">star</span>
      </div>
      <h1 className='ml-8 text-white font-bold bg-red-700 w-fit p-1 rounded-lg mb-2'>Approved</h1>

      <div className='bg-white rounded-md p-4'>
        Condimentum a erat habitasse magna gravida; vehicula leo. Luctus elementum fringilla fringilla leo lectus ornare ligula ante. Iaculis sollicitudin sapien justo arcu blandit quis interdum imperdiet ac.
      </div>
    </div>
  )
}

export default Review