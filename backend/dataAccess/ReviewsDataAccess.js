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

async function createReview(review, ORM=true) {
    if(!ORM) {
        const sql = "INSERT INTO Reviews SET ?";
        const [result] = await conn.query(sql, review);
        return {review_id: result.insertId, ...review}
    }
    else {
        return await Review.create(review);
    }
}

async function getReviewById(review_id, ORM=true) {
    if(!ORM) {
        const sql = "SELECT * FROM Reviews WHERE review_id = ?";
        const [rows] = await conn.query(sql, review_id);

        if(rows.length == 0) {
            return null;
        }
        return rows;
    }
    else {
        return await Review.findByPk(review_id);
    }
}

export {
  associationsTest,
  getReviews,
  createReview,
  getReviewById
}