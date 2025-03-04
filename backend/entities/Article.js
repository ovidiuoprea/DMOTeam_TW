import { Sequelize } from "sequelize";
import dbORM from "../dbORMConfig.js";
import Conference from "./Conference.js";
import ConferenceAuthor from "./ConferenceAuthor.js";

const Article = dbORM.define("Articles",{
  article_id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false,
  },
  title:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  content:{
    type: Sequelize.STRING,
    allowNull:false,
  },
  conference_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Conference,  
      key: 'conference_id', 
    },
  },
  author_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: ConferenceAuthor,  
      key: 'author_id', 
    },
    onDelete: 'CASCADE',
  },
  reviewer_id1: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  reviewer_id2: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

export default Article;