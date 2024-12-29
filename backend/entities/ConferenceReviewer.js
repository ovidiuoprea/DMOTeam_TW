import { Sequelize } from "sequelize";
import dbORM from "../dbORMConfig.js";

const ConferenceReviewer = dbORM.define(
    "conference_reviewers",
    {
        cr_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        conference_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        reviewer_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }
)

export default ConferenceReviewer;