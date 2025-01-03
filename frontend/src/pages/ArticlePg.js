import NavBar from '../components/NavBar'
import ArticleUI from '../components/ArticleUI';
import { useParams } from 'react-router-dom';

const ArticlePg = () => {

  const { article_id } = useParams();
  
  return (
    <div className='h-screen w-full '>
      <NavBar/> 
      {/* {user.role==="Organizer" && <OrganizatorUI user={user} />}
      {user.role==="Author" && <AutorUI user={user} />} */}
      <ArticleUI article_id = {article_id}/>
    </div>
  )
}

export default ArticlePg