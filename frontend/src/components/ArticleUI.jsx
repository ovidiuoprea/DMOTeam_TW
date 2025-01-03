import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Review from '../components/Review'

const ArticlePage = ( {article_id} ) => {
  
    const [article, setArticle] = useState('');

    useEffect(()=>{
      
          const fetchData = async() => {
              try{
                const response = await fetch(process.env.REACT_APP_API_URL + `/article-api/article-data/${article_id}`);
                if(!response.ok){
                  throw new Error("Ceva a mers prost cu fetch-ul");
                }
                const result = await response.json();
  
                setArticle(result[0]);
              }
              catch(error){
                console.error(error.message); 
              }
            }
          fetchData();
  
    }, [article_id]);

  return (
    <div className='w-full'>
      <NavBar />  
      <div className='grid grid-cols-[1fr_2.5fr] max-lg:grid-cols-1 h-full w-full pt-[80px] bg-gray-200'>
        <div className='flex justify-center p-10 px-2'>
          <div className='bg-white w-fit h-fit grid grid-cols-2 p-2 rounded-lg'>
            <div className='flex flex-col p-4 gap-3'>
              <p className='text-right'>Autorul articolului: </p>
              <p className='text-right'>Conferinta: </p>    
              <p className='text-right'>Statusul articolului:</p>                 
            </div>
            <div className='flex flex-col p-4 gap-3 '>
              <span className='font-bold'>{article.nume_autor}</span> 
              <span className='font-bold'>{article.nume_conferinta}</span>
              <span className={"border border-gray-300 px-4 py-2 font-bold "+ (article.is_approved?"text-green-700":"text-red-700")}>
              {article.is_approved ? "Aprobat" : "Neaprobat"}</span>
            </div>
          </div>
        </div>
        <div className='flex justify-center p-10 px-2'>
          <div className='flex flex-col max-w-[700px] bg-white p-10 pl-16 gap-10'>
            <h1 className='font-bold text-center'>{article.title}</h1>
            <p>{article.content}</p>
          </div>
        </div>
        
      </div>


      <div>
        <div className='h-fit flex flex-wrap items-center p-10'>
          <h1 className='text-2xl font-bold  mr-2'>
            Review-urile criticilor
          </h1>
          <div>
            <span className="material-symbols-outlined text-[30px] text-yellow-500">star</span>
            <span className="material-symbols-outlined text-[30px] text-yellow-500">star</span>
            <span className="material-symbols-outlined text-[30px] text-yellow-500">star</span>
            <span className="material-symbols-outlined text-[30px] text-yellow-500">star</span>
            <span className="material-symbols-outlined text-[30px] text-yellow-500">star</span>
          </div>
        </div>

        <div className='flex flex-col px-10 max-lg:px-2 gap-2'>
        {Array.from({ length: 10 }).map((_, index) => (
          <Review key={index} />
        ))}
        </div>
        
      </div>
      

      
    </div>
  )
}

export default ArticlePage