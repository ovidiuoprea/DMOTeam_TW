const API_URL = process.env.REACT_APP_API_URL + "/review-api";

export const getArticleReviews = async (article_id)=>{
  try {
    const response=await fetch(API_URL + `/review/${article_id}`);
    if(!response.ok){
      throw new Error("Problema la fetch " + response.status);
    }

    const result= await response.json();
    return result;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

export const createReview = async (rating,feedback,reviewer_id,article_id,is_approved)=>{
  try {
    const response = await fetch(API_URL + "/review",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        "rating":rating,
        "feedback":feedback,
        "reviewer_id":reviewer_id,
        "article_id":article_id,
        "is_approved":is_approved,
      })
    })

    if (!response.ok) {
      throw new Error("Problema la fetch " + response.status);
    }

    const result= await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
