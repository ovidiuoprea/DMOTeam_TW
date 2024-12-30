const API_URL =  process.env.REACT_APP_API_URL + "/conference-author-api";


export const createConferenceAuthor=async (conference_id,author_id)=>{
  try {
    const response=await fetch(API_URL + '/conference-author',{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        "conference_id": conference_id,
        "author_id": author_id,
      })
    }) 
    if (!response.ok) {
      throw new Error("Problema la fetch " + response.status);
    }

    const result= await response.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export const deleteConferenceAuthor=async(ca_id)=>{
  try {
    const response= await fetch(API_URL + `/conference-author/${ca_id}`,{
      method: "DELETE"
    })

    if(!response.ok){
      throw new Error("Problema la fetch " + response.status);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error.message);
  }
}