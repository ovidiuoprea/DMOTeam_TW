import Article from "../entities/Article.js";
import conn from "../dbConfig.js";
import ConferenceAuthor from "../entities/ConferenceAuthor.js";
import Conference from "../entities/Conference.js";
import User from "../entities/User.js";
import { Sequelize } from "sequelize";

async function associationsTest() {
  return Article.findOne({
      where: {article_id: 1},
      include: [
          { model: ConferenceAuthor, attributes: ["author_id"]},
          { model: Conference, attributes: ["conference_id"]}
      ]
  })
}

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

async function getArticleById(article_id,ORM=false) {
  if(!ORM){
    const sql = `SELECT 
    a.title,
    a.content,
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
        a.article_id = 1;
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

async function getArticlesFromConferenceAndAuthor(provided_conference_id, provided_author_id, ORM = true) {
  if(!ORM){
    const sql = `SELECT * FROM Articles WHERE conference_id = ? AND author_id = ?`;
    const [rows] = await conn.query(sql, provided_conference_id, provided_author_id);
    return rows;
  }
  else {
    return await Article.findAll({
          where: { conference_id: provided_conference_id, author_id: provided_author_id }
    });
  }
}

export {
  associationsTest,
  getArticles,
  getArticlesFromConferenceAndAuthor,
  getArticlesFromConference,
  getArticleById,
}