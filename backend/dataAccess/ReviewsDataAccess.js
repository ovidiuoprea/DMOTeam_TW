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

async function getReviewsData(article_id,ORM=false) {
  if(!ORM){
    // MODIFICA a.is_approved SA FIE r.is_approved cand modificati baza de date
    const sql =`SELECT r.review_id ,u.name,r.rating,r.is_approved,r.feedback
                FROM users u, reviews r, articles a
                WHERE u.user_id=r.reviewer_id
                AND a.article_id=r.article_id
                AND a.article_id=?;
                `;
    const [rows] =await conn.query(sql,article_id);
    return rows;
  }
  else {
    return await Review.findAll();
  }
}

async function getReviewsByReviewerId(reviewer_id,article_id, ORM = false) {
  if (!ORM) {
    const sql = `SELECT review_id FROM reviews WHERE reviewer_id = ? AND article_id= ? LIMIT 1`;
    const [rows] = await conn.query(sql, [reviewer_id,article_id]);
    return rows.length > 0 ? rows[0].review_id : false; 
  } 
  else {
    const review = await Review.findOne({
      where: {
        reviewer_id: reviewer_id,
      },
      attributes: ["review_id"],
    });
    return review ? review.review_id : false; 
  }
}




/**
 * Use JSON.stringify() in React to provide consistent data.
 * @route POST /review-api/review with body
 */

async function createReview(review, ORM = true) {
  if(!ORM) { 
      const sql = "INSERT INTO reviews SET ?";
      const [result] = await conn.query(sql, review);

      // Return data similar to ORM result:
      return {review_id: result.insertId, ...review};
  }
  else {
      return await Review.create(review);
  }
}

/**
* @route GET /review-api/review/:ca_id;
* @param {type: Number} id Requested Review's ca_id
* @param {type: Boolean} ORM true = use Sequelize ORM, false = use MySQL pool 
* @returns Review with specified ca_id
*/
async function getReviewById(review_id, ORM = true) {
  if(!ORM) { 
      const sql = "SELECT * FROM reviews WHERE ca_id = ?";
      const [rows] = await conn.query(sql, ca_id);

      // If no review is found, Sequelize returns null, so I'm mimicking the behavior here too:
      if(rows.length == 0) {
          return null;
      }

      return rows;
  }
  else {
      return await Review.findByPk(review_id);
  }
}

/**
* @route PUT /review-api/review/:ca_id with body
* @param {*} id Updated Review's ca_id
* @param {*} updatedReviewData New Review data for updated review
* @param {*} ORM true = use Sequelize ORM, false = use MySQL pool 
* @returns {error: boolean, message: "", object: updated review data in JSON format}
*/

async function updateReview(id, updatedReviewData, ORM = true) {

  if(parseInt(id) !== updatedReviewData.review_id) {
      return {error: true, message: "Provided review_id does not match review!"}
  }

  let existingReview = await getReviewById(id);
  if(!existingReview) {
      return {error: true, message: "review with review_id not found"};
  }

  if(!ORM) { 
      try{ 
          const sql = "UPDATE reviews SET ? WHERE ca_id = ?";
          const [rows] = await conn.query(sql, updatedReviewData, id);
          return {error: false, message: "review successfully updated", object: [...updatedReviewData]}
      }
      catch(error) { 
          console.error(error);
      } 
  }
  else {
      return {error: false, message: "review successfuly updated", object: await existingReview.update(updatedReviewData)};
  }
}

async function deleteReview (id, ORM = true) { 
  let deleteEntity = await getReviewById(id);
  if(!deleteEntity) { 
      return {error: true, message: "No review found"};
  }

  if(!ORM) { 
      try {
          const sql = "DELETE FROM reviews WHERE ca_id = ?";
          const [rows] = await conn.query(sql, id);
          return {error: false, message: "Review successfully deleted", object: deleteEntity}
      }
      catch (error) {
          console.error(error);
      }
  }
  else {
      return {error: false, message: "Review successfully deleted", object: await deleteEntity.destroy()};
  }
}

export {
  associationsTest,
  createReview,
  getReviewById,
  getReviews,
  updateReview,
  deleteReview,
  getReviewsData,
  getReviewsByReviewerId,
}