import { Sequelize } from "sequelize";
import dbORM from "../dbORMConfig.js";
import Conference from "./Conference.js"
import Article from "./Article.js";

const ConferenceAuthor = dbORM.define("Conference_authors", {
    ca_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    conference_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Conference,  
            key: 'conference_id', 
        },
        onDelete: 'CASCADE'
    },
    author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Article,  
            key: 'author_id', 
        },
        onDelete: 'CASCADE'
    }
})

export default ConferenceAuthor;
