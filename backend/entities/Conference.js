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
    }
})

User.hasMany(Conference, {as: "Conferences", foreignKey: "organizer_id"});
Conference.belongsTo(User, {as: "Organizer", foreignKey: "organizer_id"})

export default Conference;
