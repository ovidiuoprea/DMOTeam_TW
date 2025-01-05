import React, { useState } from 'react'

const EditArticle = ({article,toggleEditMode}) => {
  const [newTitle,setNewTtile]=useState(article.title);
  const [newContent,setNewContent]=useState(article.content);
  return (
    <div className='flex flex-col max-w-[700px] w-[700px] min-h-[800px] max-h-[800px] bg-white p-10 pt-14 pl-16 gap-10 overflow-y-scroll relative'>
      <div className='absolute right-0 top-0 bg-green-500 text-white rounded-md px-4 py-2 text-lg cursor-pointer select-none'
              onClick={toggleEditMode}
            >
              Salveaza
            </div>
      <input 
        type='text' 
        defaultValue={article.title}
        className='text-2xl font-bold text-center border-2 border-gray-400 rounded-md'
        onChange={(e)=>setNewTtile(e.target.value)}
      />
      <textarea 
        defaultValue={article.content}
        onChange={(e)=>setNewContent(e.target.value)}
        className='border-2 border-gray-400 rounded-md'
      />
    </div>
  )
}

export default EditArticle