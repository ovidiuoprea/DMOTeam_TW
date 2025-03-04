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



//Daca exista deja un review pentru utilizatorul curent facem update pe review daca nu il cream
export const createReview = async (rating,feedback,reviewer_id,article_id,is_approved)=>{
  try {
    const exists=await fetch(API_URL+`/review-reviewer/${reviewer_id}`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        article_id: article_id
      })
    });

    console.log("Exists: ", exists);

    if (!exists.ok){
      throw new Error("Problema la fetch " + exists.status);
    }
    const existResult=await exists.json();
    console.log("Exist result: ", existResult);

    if(existResult){
      const update=await fetch(API_URL+`/review/${existResult}`,{
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          "review_id":existResult,
          "rating":rating,
          "feedback":feedback,
          "reviewer_id":reviewer_id,
          "article_id":article_id,
          "is_approved":is_approved,
        })
      })

      if (!update.ok) {
        throw new Error("Problema la fetch " + update.status);
      }
  
      const resultUpdate= await update.json();
      console.log(resultUpdate);
    }
    else{
        console.log("Ar trebui sa fiu aici, in create");
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
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}
