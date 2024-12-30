import Review from "../entities/Reviews.js";
import conn from "../dbConfig.js";
import Article from "../entities/Article.js";
import ConferenceReviewer from "../entities/ConferenceReviewer.js";


async function associationsTest() {
  return Review.findOne({
      where: {review_id: 1},
      include: [
          { model: Article, attributes: ["title"] },
          { model: ConferenceReviewer, attributes: ["reviewer_id"] }
      ]
  })
}

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
  associationsTest,
  getReviews,
}