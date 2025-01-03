const API_URL =  process.env.REACT_APP_API_URL + "/article-api";


export const getArticleById=async(article_id)=>{
  try {
    const response=await fetch(API_URL+`/article/${article_id}`)
    if(!response.ok){
      throw new Error("Problema la fetch " + response.status);
    }
    const result=await response.json();
    return result;

  } catch (error) {
    console.error("Error:", error.message);  }
}

export const createArticle = async (articleData) => {
  try {
    console.log(articleData);

    const response = await fetch(process.env.REACT_APP_API_URL + `/conference-reviewer-api/conference-reviewer/conference/${articleData.conference_id}`);
    const reviewers = await response.json(); 

    console.log(articleData);
    if (!response.ok) {
      throw new Error('Failed to fetch reviewers');
    }

    articleData.reviewer_id1 = reviewers[Math.floor(Math.random() * reviewers.length)].reviewer_id;

    do {
      articleData.reviewer_id2 = reviewers[Math.floor(Math.random() * reviewers.length)].reviewer_id;
    } while (articleData.reviewer_id1 === articleData.reviewer_id2); 

    const articleResponse = await fetch(API_URL + '/article', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });

    const result = await articleResponse.json(); 
    return { ok: true, result };

  } catch (error) {
    console.error("Error:", error.message);
    return { error: error.message }; 
  }
};
