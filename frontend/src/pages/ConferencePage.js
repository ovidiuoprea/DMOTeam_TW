import NavBar from '../components/NavBar'
import ConferenceUI from '../components/ConferenceUI';
import { useParams } from 'react-router-dom';

const ConferencePage = () => {

  const { conference_id } = useParams();
  
  return (
    <div className='h-screen w-full '>
      <NavBar/> 
      {/* {user.role==="Organizer" && <OrganizatorUI user={user} />}
      {user.role==="Author" && <AutorUI user={user} />} */}
      <ConferenceUI conference_id = {conference_id}/>
    </div>
  )
}

export default ConferencePage