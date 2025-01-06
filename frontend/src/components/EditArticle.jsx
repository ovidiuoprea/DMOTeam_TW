import React, { useState } from 'react'
import { saveArticle } from '../services/articleService';
import { getArticleById } from '../services/articleService';

const EditArticle = ({article,toggleEditMode,setArticle}) => {
  const [newTitle,setNewTtile]=useState(article.title);
  const [newContent,setNewContent]=useState(article.content);

  const updateArticle=async ()=>{
      const newArticle={
        article_id:article.article_id,
        title:newTitle,
        content:newContent,
        conference_id:article.conference_id,
        author_id:article.author_id,
        reviewer_id1:article.reviewer_id1,
        reviewer_id2:article.reviewer_id2,
      }
      saveArticle(newArticle);
      window.location.reload()
  }

  return (
    <div className='flex flex-col max-w-[700px] w-[700px] min-h-[800px] max-h-[800px] bg-white p-10 pt-14 pl-16 gap-10 overflow-y-scroll relative'>
      <div className='absolute right-0 top-0 bg-green-500 text-white rounded-md px-4 py-2 text-lg cursor-pointer select-none'
              onClick={()=>{toggleEditMode(); updateArticle()}}
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