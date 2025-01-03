const API_URL =  process.env.REACT_APP_API_URL + "/review-api";

export const getArticleReviews=async (article_id)=>{
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
