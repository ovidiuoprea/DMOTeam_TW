import { Sequelize } from "sequelize";
import ConferenceReviewer from "./ConferenceReviewer.js";
import Conference from "./Conference.js";
import User from "./User.js";

const Associations = () => { 
    ConferenceReviewer.belongsTo(User, {
        foreignKey: "reviewer_id",
        targetKey: "user_id",
        onDelete: "CASCADE"
    });

    ConferenceReviewer.belongsTo(Conference, {
        foreignKey: "conference_id",
        onDelete: "CASCADE"
    });

    User.hasMany(ConferenceReviewer, {
        foreignKey: "reviewer_id"
    });

    Conference.hasMany(ConferenceReviewer, {
        foreignKey: "conference_id"
    })
}

export default Associations;