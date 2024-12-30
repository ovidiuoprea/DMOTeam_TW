import { Sequelize } from "sequelize";
import dbORM from "../dbORMConfig.js";
import User from "../entities/User.js"

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
        references: {
            model: User,
            key: 'organizer_id'
        },
        onDelete: 'CASCADE'
    }
})

export default Conference;
