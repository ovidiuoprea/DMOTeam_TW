import { Sequelize } from "sequelize";
import dbORM from "../dbORMConfig.js";
import User from "./User.js";
import Conference from "./Conference.js";

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
  is_approved: {
    type: Sequelize.BOOLEAN,
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
      model: User,  
      key: 'user_id', 
    },
  }
})

export default Article;