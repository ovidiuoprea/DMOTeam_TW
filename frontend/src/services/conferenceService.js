const API_URL =  process.env.REACT_APP_API_URL + "/conference-api";

export const createConference= async (user_id, name, description)=>{
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + "/conference-api/conference",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        "organizer_id": user_id,
        "name": name,
        "description": description
      })
    })

    if (!response.ok) {
      throw new Error("Problema la fetch " + response.status);
    }

    const result= await response.json();
    return result.conference_id;
  } catch (error) {
    console.error("Error:", error.message);
  }
}


export const getConferencesForAuthor=async (id_author)=>{
  try {
    const response = await fetch(API_URL + `/conference/author/${id_author}`)
    if(!response.ok){
      throw new Error("Problema la fetch");
    }
    const result =await response.json();
    return result;
  } catch (error) {
    console.error("Error:",error.message);
  }
} 

export const getConferenceByID = async (conference_id) => {
    try {
        const url = API_URL + "/conference/" + conference_id;

        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("Could not GET conference by conference_id");
        }
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.error("Error: ", error.message);
    }
}

export const getConferencesByOrganizerID = async (organizer_id) => {
    try {
        const url = API_URL + "/conference/organizer/" + organizer_id;
        
        const response = await fetch(url);
        if(!response.ok) { 
            throw new Error("Could not GET conferences by organizer_id");
        }
        const result = await response.json();
        
        return result;
    }
    catch(error) {
        console.error("Error: ", error.message);
    }
}

export const updateConference = async (conference_id, name, description) => { 
    try {
        const url = API_URL + "/conference/" + conference_id;

        const response = await fetch(url,{
            method:"PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              "conference_id": conference_id,
              "name": name,
              "description": description
            })
          });
        const result = await response.json();

        return result;
    }
    catch(error) {
        console.error("Error: ", error.message);
    }
}