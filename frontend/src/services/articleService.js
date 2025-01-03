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
    const response = await fetch(API_URL+`/article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message}`);
    }

    const data = await response.json();
    console.log("Articol creat cu succes:", data);
  } catch (error) {
    console.error("Eroare la crearea articolului:", error);
  }
};
