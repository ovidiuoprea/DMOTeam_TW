import React, { useEffect, useState } from 'react'
import Button from './Button';
import { getCurrentAuthenticatedUser } from '../services/userService';
import { createArticle } from '../services/articleService';

const AddArticle = ({conference_id}) => {

    const [user, setUser] = useState(getCurrentAuthenticatedUser());

  const handleOnSubmit = async (e)=>{
    e.preventDefault();
 
    const createdArticle = await createArticle();
  }

  return (
    <div className='px-16 py-2'>  
      <p className='text-3xl mb-8 mt-4 font-bold'>Creare Articol</p>

      <form onSubmit={handleOnSubmit}>
        <div className="mb-2 mt-2">
            <label htmlFor="articleTitle" className="block text-m font-medium text-gray-600 mb-2">Titlu Articol</label>
            <input 
              type="text" 
              id="articleTitle" 
              name="articleTitle" 
              placeholder="Introdu titlul articolului ..." 
              required 
              className="w-50 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>

        <div className="mb-4">
            <label htmlFor="articleContent" className="block text-m font-medium text-gray-600 mb-2">Conținutul Articolului</label>
            <textarea 
              id="articleContent" 
              name="articleContent" 
              placeholder="Scrie Articolul ..." 
              required 
              className="w-full min-h-[40vh] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>

        

        <div className='flex justify-center mt-8'>
          <button 
            type="submit"
            className={`w-fit  px-8 text-white py-2 rounded-lg  ${1 < 2 ? "bg-gray-700 " : "bg-blue-800 hover:bg-blue-600 transition-colors"}`}
            disabled={1<2}            
          >
            Adăugare Articol
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default AddArticle