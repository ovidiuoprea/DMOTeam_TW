import React, { useEffect, useState } from 'react'
import Button from './Button';
import { createConference, updateConference } from '../services/conferenceService';
import { getReviewers } from '../services/userService';
import { createConferenceReviewer,  } from '../services/conferenceReviewersService';

const CreateConference = ({user, edit_mode, conferenceToEdit}) => {
    const [conferenceName,setConferenceName]=useState(edit_mode ? conferenceToEdit.name : "");
    const [conferenceDescription,setConferenceDescription]=useState(edit_mode ? conferenceToEdit.description : "");
    const [updatedConference, setUpdatedConference] = useState(false);

    const [reviewers,setReviewers]=useState([]);
    const [selectedReviewers, setSelectedReviewers] = useState([]); 


    useEffect(() => {
        const fetchReviewers = async () => {
            const data = await getReviewers();
            setReviewers(data);
        };
        fetchReviewers();
    }, []);


    /**
     * 
     * @param {*} id - 
     */
  const handleSelectReviewer = (id) => {
    setSelectedReviewers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((reviewerId) => reviewerId !== id)
        : [...prevSelected, id] 
    );
  };

  const handleOnSubmit =async (e)=>{
    e.preventDefault();

    if(!edit_mode) {

        const conferenceId= await createConference(user.user_id, conferenceName, conferenceDescription);
        
        selectedReviewers.map((selectedReviewer)=>{
          createConferenceReviewer(selectedReviewer,conferenceId)
        })
    }
    else {
        //TODO: Update conference;
        const response = await updateConference(conferenceToEdit.conference_id, conferenceName, conferenceDescription);
        if(!response.error) {
            setUpdatedConference(true);
        }
    }
  }

  return (
    <div className='px-16 py-4'>  
      <p className='text-lg font-bold'>Creeare conferință</p>

      <form onSubmit={handleOnSubmit}>
        <div className="mb-4 mt-4">
            <label htmlFor="conferenceName" className="block text-sm font-medium text-gray-600 mb-1">Numele conferinței</label>
            <input 
              type="text" 
              id="conferenceName" 
              name="conferenceName" 
              placeholder="Introdu numele conferinței ..." 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={edit_mode ? conferenceToEdit.name : ""}
              onChange={(event)=>{setConferenceName(event.target.value)}}
            />
        </div>

        <div className="mb-4">
            <label htmlFor="conferenceDescripition" className="block text-sm font-medium text-gray-600 mb-1">Descriere</label>
            <input 
              type="text" 
              id="conferenceDescripition" 
              name="conferenceDescripition" 
              placeholder="Descrie conferinta ..." 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={edit_mode ? conferenceToEdit.description : ""}
              onChange={(event)=>{setConferenceDescription(event.target.value)}}
            />
        </div>

        {!edit_mode && ( 
            <div className="mb-4">
                <label htmlFor="" className="block text-sm font-medium text-gray-600 mb-1">Revieweri</label>
                <div className='flex flex-wrap gap-4'>
                    {reviewers.map((r) => (
                        <div
                            key={r.user_id}
                            onClick={() => handleSelectReviewer(r.user_id)}
                            className={`p-4 mb-4 cursor-pointer rounded-lg transition-colors 
                                ${ selectedReviewers.includes(r.user_id) ? "bg-green-500 text-white" : "bg-gray-100" }}`}
                            >
                        {r.name}
                        </div>
                    ))}
                </div>
            </div>
        )}
        
        <p className='flex justify-center mt-8 text-green-700'>{updatedConference ? "Conferinta actualizata cu succes!" : ""}</p>

        <div className='flex justify-center mt-8'>
          <button 
            type="submit"
            className={`w-fit px-8 text-white py-2 rounded-lg  ${!edit_mode ? (selectedReviewers.length < 2 ? "bg-gray-700 " : "bg-blue-800 hover:bg-blue-600 transition-colors") : "bg-blue-800 hover:bg-blue-600 transition-colors"}`}
            disabled= {!edit_mode ? selectedReviewers.length<2 : false}            
          >
            Salvare conferință
          </button>
        </div>

        
      </form>
    </div>
  )
}

export default CreateConference