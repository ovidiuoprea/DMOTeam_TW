import Article from "../entities/Article.js";
import conn from "../dbConfig.js";
import ConferenceAuthor from "../entities/ConferenceAuthor.js";
import Conference from "../entities/Conference.js";

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

async function getArticlesFromConference(provided_conference_id, ORM = true) {
  if(!ORM){
    const sql = `SELECT * FROM Articles WHERE conference_id = ?`;
    const [rows] = await conn.query(sql, provided_conference_id);
    return rows;
  }
  else {
    return await Article.findAll({
          where: { conference_id: provided_conference_id }
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
}