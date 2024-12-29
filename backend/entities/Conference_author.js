import { Sequelize } from "sequelize";
import dbORM from "../dbORMConfig.js";
import Conference from "./Conference.js"

const Conference_author = dbORM.define("Conference_authors", {
    ca_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    conference_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    }
})

Conference.hasMany(Conference_author, {as: "ConferenceAuthors", foreignKey: "conference_id"});
Conference_author.belongsTo(Conference, {as: "COnference", foreignKey: "conference_id"})

export default Conference_author;
