import Article from "../entities/Article.js";
import conn from "../dbConfig.js";



async function getArticles(ORM=true) {
  if(!ORM) {
    const sql = "SELECT * FROM Articles";
    const [rows] = await conn.query(sql);
    return rows;
  }
  else {
      return await Article.findAll();
  }
}


export {
  getArticles,
}