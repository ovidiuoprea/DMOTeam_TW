import { Sequelize } from "sequelize";
import ConferenceReviewer from "./ConferenceReviewer.js";
import Conference from "./Conference.js";
import User from "./User.js";
import ConferenceAuthor from "./ConferenceAuthor.js";
import Article from "./Article.js";
import Review from "./Reviews.js";

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
    });

    // Changes I made, delete from here if its broken (im not good at making comments)
    ConferenceAuthor.belongsTo(User, {
        foreignKey: "author_id",
        onDelete: 'CASCADE'
    });
    User.hasMany(ConferenceAuthor, {
        foreignKey: "author_id" 
    });


    ConferenceAuthor.belongsTo(Conference, {
        foreignKey: "conference_id",
        onDelete: 'CASCADE'
    });
    Conference.hasMany(ConferenceAuthor, {
        foreignKey: "conference_id"
    });


    Article.belongsTo(ConferenceAuthor, {
        foreignKey: "author_id",
        onDelete: 'CASCADE',
        hooks: true
    });
    ConferenceAuthor.hasMany(Article, {
        foreignKey: "author_id"
    });


    Conference.belongsTo(User, {
        foreignKey: "organizer_id",
        onDelete: 'CASCADE'
    });
    User.hasMany(Conference, {
         foreignKey: "organizer_id"
    });



    Article.belongsTo(Conference, {
        foreignKey: "conference_id",
        onDelete: 'CASCADE'
    });
    Conference.hasMany(Article, {
        foreignKey: "conference_id"
    })


    Review.belongsTo(ConferenceReviewer, {
        foreignKey: "reviewer_id",
        onDelete: 'CASCADE'
    });
    ConferenceReviewer.hasMany(Review, {
         foreignKey: "reviewer_id"
    });


    Review.belongsTo(Article, {
        foreignKey: "article_id",
        onDelete: 'CASCADE'
    });
    Article.hasMany(Review, {
        foreignKey: "article_id"
    })
}

export default Associations;