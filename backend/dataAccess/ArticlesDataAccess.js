import Article from "../entities/Article.js";
import conn from "../dbConfig.js";
import ConferenceAuthor from "../entities/ConferenceAuthor.js";
import Conference from "../entities/Conference.js";
import User from "../entities/User.js";

async function associationsTest() {
  return Article.findOne({
      where: {article_id: 1},
      include: [
          { model: ConferenceAuthor, attributes: ["author_id"]},
          { model: Conference, attributes: ["conference_id"]}
      ]
  })
}

async function getArticles(ORM=false) {
  if(!ORM) {
    const sql = "SELECT a.*,isArticleApproved(a.article_id) AS is_approved FROM Articles a";
    const [rows] = await conn.query(sql);
    return rows;
  }
  else {
      return await Article.findAll();
  }
}

async function createArticle(article, ORM = true) {
  if(!ORM) { 
      const sql = "INSERT INTO Articles SET ?";
      const [result] = await conn.query(sql, article);

      // Return data similar to ORM result:
      return {article_id: result.insertId, ...article};
  }
  else {
      return await Article.create(article);
  }
}



async function updateArticle(id, updatedArticleData, ORM = true) {

  if(parseInt(id) !== updatedArticleData.article_id) {
      return {error: true, message: "Provided article_id does not match Article!"}
  }

  let existingArticle = await getArticleById(id);
  if(!existingArticle) {
      return {error: true, message: "Article with article_id not found"};
  }

  if(!ORM) { 
      try{ 
          const sql = "UPDATE Articles SET ? WHERE article_id = ?";
          const [rows] = await conn.query(sql, updatedArticleData, id);
          return {error: false, message: "Article successfully updated", object: [...updatedArticleData]}
      }
      catch(error) { 
          console.error(error);
      } 
  }
  else {
      return {error: false, message: "Article successfuly updated", object: await existingArticle.update(updatedArticleData)};
  }
}

async function deleteArticle (id, ORM = true) { 
  let deleteEntity = await getArticleById(id);
  if(!deleteEntity) { 
      return {error: true, message: "No article found"};
  }

  if(!ORM) { 
      try {
          const sql = "DELETE FROM Articles WHERE article_id = ?";
          const [rows] = await conn.query(sql, id);
          return {error: false, message: "Article successfully deleted", object: deleteEntity}
      }
      catch (error) {
          console.error(error);
      }
  }
  else {
      return {error: false, message: "Article successfully deleted", object: await deleteEntity.destroy()};
  }
}

async function getArticleById(article_id,ORM=false) {
  if(!ORM){
    const sql = `SELECT 
    a.*,
    c.name AS conference_name,
    u.name AS author_name,
    isArticleApproved(a.article_id) AS is_approved
    FROM 
        articles a
    JOIN 
        users u ON a.author_id = u.user_id
    JOIN 
        conferences c ON a.conference_id = c.conference_id
    WHERE 
        a.article_id = ?;
    `;
    const [rows] = await conn.query(sql,article_id);
    return rows;
  }
  else{
    // return await Article.findAll({where:{article_id:`${article_id}`}})
  }
}

async function getArticlesFromConference(provided_conference_id, ORM = false) {
  if(!ORM){
    const sql =  `select distinct a.*, u.name from articles a
                  join conference_authors ca on ca.author_id = a.author_id
                  join users u on u.user_id = ca.author_id
                  WHERE a.conference_id = ?`;
    const [rows] = await conn.query(sql, provided_conference_id);
    return rows;
  }
  else {
    //to-do: orm
    return await Article.findAll({
      include: [
        {
          model: ConferenceAuthor,
          required: true,
          include: [
            {
              model: User, // Join the User model to get the author's name
              attributes: ['name'], // Only select the name from the User model
            }
          ]
        }
      ],
      where: {
        conference_id: provided_conference_id, 
      },
    });
  }
}


export {
  associationsTest,
  getArticles,
  getArticlesFromConference,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleById,
}