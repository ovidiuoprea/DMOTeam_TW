import Review from "../entities/Reviews.js";
import conn from "../dbConfig.js";



async function getReviews(ORM=true) {
  if(!ORM) {
    const sql = "SELECT * FROM Reviews";
    const [rows] = await conn.query(sql);
    return rows;
  }
  else {
    return await Review.findAll();
  }
}


export {
  getReviews,
}