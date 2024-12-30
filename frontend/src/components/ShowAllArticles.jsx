import React, { useEffect, useState } from 'react'

const ShowAllArticles = () => {
  const [articles,setArticles]=useState([]);

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response=await fetch(process.env.REACT_APP_API_URL + "/article-api/article");
        if(!response.ok){
          throw new Error("Ceva a mers prost cu fetch-ul");
        }
        const result= await response.json();
        setArticles(result);
      }
      catch(error){
        console.error(error.message); 
      }
    }

    fetchData();
  })

  return (
    <div className="px-16 py-8">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Conference ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Author ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}
            >
              <td className="border border-gray-300 px-4 py-2">{a.title}</td>
              <td className="border border-gray-300 px-4 py-2">{a.conference_id}</td>
              <td className="border border-gray-300 px-4 py-2">{a.author_id}</td>
              <td className={"border border-gray-300 px-4 py-2 font-bold "+ (a.is_approved?"text-green-700":"text-red-700")}>
                {a.is_approved ? "Aprobat" : "Neaprobat"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default ShowAllArticles