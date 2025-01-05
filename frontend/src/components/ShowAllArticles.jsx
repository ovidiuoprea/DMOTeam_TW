import React, { useEffect, useState } from 'react'
import { getArticlesForReviewer } from '../services/userService';
import { getConferenceByID } from '../services/conferenceService';

const ShowAllArticles = ({show_all, reviewer_id}) => {
  const [articles,setArticles]=useState([]);
  const [conference, setConference] = useState();

  useEffect(()=>{
    
    if(show_all === true) {
        const fetchData=async()=>{
            try{
              const response=await fetch(process.env.REACT_APP_API_URL + "/article-api/article");
              if(!response.ok){
                throw new Error("Ceva a mers prost cu fetch-ul");
              }
              const result= await response.json();

              const updatedArticles = await Promise.all(
                result.map(async (article) => {
                    const conference = await getConferenceByID(article.conference_id);
                    article.conference_name = conference.name;
                    return article;
                })
              )

              setArticles(updatedArticles);
            }
            catch(error){
              console.error(error.message); 
            }
          }
        fetchData();
    }
    else {
        const fetchData = async ()=> {
            const articles = await getArticlesForReviewer(reviewer_id);

            if(articles){
              const updatedArticles = await Promise.all(
                  articles.map(async (article) => {
                      const conference = await getConferenceByID(article.conference_id);
                      article.conference_name = conference.name;
                      return article; 
                  })
            )
          
            setArticles(updatedArticles);
          }
        }
        fetchData();
    }
    

  }, [show_all, reviewer_id]);

  return (
    <div className="px-16 py-8">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Nume conferinta</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Author ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {articles?.map((a, index) => {
              return (
                  <tr
                      onClick={()=>{window.location.href="/article/" + a.article_id}}
                      key={index}
                      className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 cursor-pointer`}>
                      <td className="border border-gray-300 px-4 py-2">{a.title}</td>
                      <td className="border border-gray-300 px-4 py-2">{a.conference_name ? a.conference_name : a.conference_id}</td>
                      <td className="border border-gray-300 px-4 py-2">{a.author_id}</td>
                      <td className={"border border-gray-300 px-4 py-2 font-bold "+ (a.is_approved?"text-green-700":"text-red-700")}>
                          {a.is_approved ? "Aprobat" : "Neaprobat"}
                      </td>
                  </tr>
              )          
          })}
        </tbody>
      </table>
    </div>

  )
}

export default ShowAllArticles