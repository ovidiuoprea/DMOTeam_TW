import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Review from '../components/Review'
import { useParams } from 'react-router-dom';
import { getArticleById, isReviewerAllocatedForArticle } from '../services/articleService';
import { getArticleReviews } from '../services/reviewsService';
import AddReview from '../components/AddReview';
import { getCurrentAuthenticatedUser, getUserById } from '../services/userService';
import EditArticle from '../components/EditArticle';




const ArticlePage = () => {
  const [user, setUser] = useState(getCurrentAuthenticatedUser());

  const { article_id } = useParams();
  const [article,setArticle]=useState(null);
  const [reviews,setReviews]=useState([]);
  const [addReview,setAddReview]=useState(false);
  const [reviewers,setReviewers]=useState([]);
  const [editMode,setEditMode]=useState(false);

  useEffect(()=>{
    const fetchArticleData=async ()=>{
      const article=await getArticleById(article_id);
      setArticle(article);

      const reviewsData=await getArticleReviews(article_id);
      setReviews(reviewsData)

      const articleReviewer1= await getUserById(article.reviewer_id1);
      const articleReviewer2= await getUserById(article.reviewer_id2);

      setReviewers([articleReviewer1,articleReviewer2]);
    }

    fetchArticleData();
  },[])


  const ArticlePagination = ({ content }) => {
    const [paragraphs, setParagraphs] = useState([]);
  
    useEffect(() => {
      if (content) {
        const sentences = content.split('.'); 
        let j = 0, i = 0;
        const newParagraphs = [];
        
        while (j < sentences.length) {
          let pageContent = '';
          
          while (pageContent.length < (i === 0 ? 1970 : 2200) && j < sentences.length) {
            pageContent += sentences[j++];
            if (pageContent[pageContent.length - 1] !== '.') pageContent += '.';
          }
  
          newParagraphs.push(
            <p key={i}>
              {pageContent} 
            </p>
          );
  
          while (pageContent.length < 2200 && i !== 0) {
            pageContent += '_____________________________________________________________________________';
            if(pageContent.length < 2200 ) newParagraphs.push(<br />);
          }
  
          newParagraphs.push(
            <p key={`articlePage-${i}`}>
              <br /><strong>Pagina {i + 1}</strong> <br /><br />
            </p>
          );
          newParagraphs.push(
            <div>
              <hr /><br />
            </div>
          );
          
  
          i++;
        }
  
        setParagraphs(<div className='text-justify'>{newParagraphs}</div>); 
      }
    }, [content]);
  
    return (
      <div>
        {paragraphs}
      </div>
    );
  };
    
  const [isAllocatedReviewer, setisAllocatedReviewer] = useState(false);

  useEffect(() => {
    const checkReviewerAllocation = () => {
      if (user?.role === 'Reviewer' && article) {
        setisAllocatedReviewer(article.reviewer_id1 === user.user_id || article.reviewer_id2 === user.user_id);
      }
    };
    checkReviewerAllocation();
  }, [user, article]);

  const toggleEditMode=()=>{
    editMode?setEditMode(false):setEditMode(true);
  }

  return (
    <div className='w-full'>
      <NavBar />  
      <div className='grid grid-cols-[1fr_2.5fr] max-lg:grid-cols-1 h-full w-full pt-[80px] bg-gray-200'>
        <div className='flex flex-col items-center p-10 px-2 gap-12'>
          <div className='bg-white w-fit h-fit grid grid-cols-2 p-2 rounded-lg'>
            <div className='flex flex-col p-4 gap-3'>
              <p className='text-right'>Autorul articolului: </p>
              <p className='text-right'>Conferinta: </p>    
              <p className='text-right'>Statusul articolului:</p>                 
            </div>
            <div className='flex flex-col p-4 gap-3 '>
              <span className='font-bold'>{article?.author_name}</span> 
              <span className='font-bold'>{article?.conference_name}</span>
              <span className={'font-bold '+ (article?.is_approved?"text-green-700":"text-red-700")}>{article?.is_approved?"Aprobat":"Neaprobat"}</span>
            </div>
          </div>

          <div className='bg-white w-fit h-fit grid grid-cols-[1.5fr_2fr] p-2 rounded-lg'>
            <div className='flex flex-col p-4 gap-3'>
              <p className='text-right'>Reviewer&nbsp;1<span className="material-symbols-outlined text-[20px] text-yellow-500">star</span></p>
              <p className='text-right'>Reviewer&nbsp;2<span className="material-symbols-outlined text-[20px] text-yellow-500">star</span></p>    
            </div>
            <div className='flex flex-col p-4 gap-3 '>
              <span className='font-bold'>{reviewers[0]?.name}</span> 
              <span className='font-bold'>{reviewers[1]?.name}</span>
            </div>
          </div>
        </div>
        <div className='flex justify-center p-10 px-2 '>
          {!editMode && (
          <div className='flex flex-col max-w-[700px] w-[700px] min-h-[800px] max-h-[800px] bg-white p-10 pt-14 pl-16 gap-10 overflow-y-scroll relative'>
            {(user.user_id===article?.author_id) && (
              <div className='absolute right-0 top-0 bg-gray-500 text-white rounded-md px-4 py-2 text-lg cursor-pointer select-none'
                onClick={toggleEditMode}
              >
                Editeaza
              </div>
            )}
            <h1 className='font-bold text-2xl text-center'>{article?.title}</h1>
            <ArticlePagination content = {article?.content} />
          </div>
          )}
          {editMode && (
            <EditArticle article={article} toggleEditMode={toggleEditMode}/>
          )
          }
        </div>
        
      </div>


      <div>
        <div className='flex max-md:flex-col max-md:mb-10 items-center'>
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

          {isAllocatedReviewer &&
          <div className='bg-blue-700 text-white px-8 py-4 rounded-lg w-fit h-fit font-bold cursor-pointer'
            onClick={()=>{setAddReview(!addReview)}}
          >
            Adauga review
          </div> }
        </div>
        

        <div>
          {addReview && <AddReview user_id={user.user_id} article_id={article_id} />}
        </div>

        <div className='flex flex-col px-10 max-lg:px-2 gap-4'>
          {reviews.map((r)=>{
            return(
              <Review review={r} key={r.review_id} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ArticlePage