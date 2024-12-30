const API_URL =  process.env.REACT_APP_API_URL + "/conference-api";

export const createConference= async (user_id)=>{
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + "/conference-api/conference",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        "organizer_id": user_id
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