import { Sequelize } from "sequelize";
import dbORM from "../dbORMConfig.js";

const Conference = dbORM.define("Conferences", {
    conference_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    organizer_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})

export default Conference;
