import { Sequelize } from "sequelize";
import dbORM from "../dbORMConfig.js";
import Article from "./Article.js";
import ConferenceReviewer from "./ConferenceReviewer.js";

const Review = dbORM.define("Reviews", {
    review_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    reviewer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: ConferenceReviewer,
            key: "reviewer_id"
        },
        onDelete: 'CASCADE'
    },
    article_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: Article,
            key: "article_id"
        },
        onDelete: 'CASCADE'
    },
    rating: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    feedback: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    is_approved:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
    },
});

export default Review;