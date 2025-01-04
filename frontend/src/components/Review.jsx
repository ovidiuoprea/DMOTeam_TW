import React from 'react'

const Review = ({review}) => {
  return (
    <div className='w-full h-fit bg-gray-200 rounded-lg p-2'>
      <div className='flex items-center'>
        <span className="material-symbols-outlined text-[40px]">account_circle</span>
        <p className='text-lg'>{review.name}</p>
      </div>
      <div className='pl-8'>
        <span className={"material-symbols-outlined text-[25px] "+ (review.rating>=1?" text-yellow-500":"")}>star</span>
        <span className={"material-symbols-outlined text-[25px] "+ (review.rating>=2?" text-yellow-500":"")}>star</span>
        <span className={"material-symbols-outlined text-[25px] "+ (review.rating>=3?" text-yellow-500":"")}>star</span>
        <span className={"material-symbols-outlined text-[25px] "+ (review.rating>=4?" text-yellow-500":"")}>star</span>
        <span className={"material-symbols-outlined text-[25px] "+ (review.rating>=5?" text-yellow-500":"")}>star</span>
      </div>
      <h1 className={'ml-8 text-white font-bold  w-fit p-1 rounded-lg mb-2 '+(review.is_approved?"bg-green-700":"bg-red-700")}>
        {review.is_approved?"Aprobat":"Neaprobat"}
      </h1>

      <div className='bg-white rounded-md p-4'>
        {review.feedback}
      </div>
    </div>
  )
}

export default Review