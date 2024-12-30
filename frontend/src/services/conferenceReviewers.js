const API_URL =  process.env.REACT_APP_API_URL + "/conference-reviewer-api";

export const createConferenceReviewer=async (selectedReviewerId,conference_id)=>{
  try {
    const response = await fetch(API_URL+"/conference-reviewer",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        "conference_id": conference_id,
        "reviewer_id": selectedReviewerId,
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