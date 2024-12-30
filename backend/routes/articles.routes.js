import express from "express";
import {associationsTest, getArticles, getArticlesFromConferenceAndAuthor, getArticlesFromConference} from "../dataAccess/ArticlesDataAccess.js"


const articlesRouter = express.Router();


articlesRouter.route('/associations-test')
    .get(async (req, res) => { res.status(200).json(await associationsTest())}); 

articlesRouter.route('/article')
    .get(async (req, res) => { res.status(200).json(await getArticles())}); 

articlesRouter.route('/article-conference/:conference_id')
    .get(async (req, res) => { 
        res.status(200).json(await getArticlesFromConference(req.params.conference_id));
    }); 

articlesRouter.route('/article-conference-author/:conference_id-:author_id')
    .get(async (req, res) => { 
        res.status(200).json(await getArticlesFromConferenceAndAuthor(req.params.conference_id, req.params.author_id));
    }); 

    export default articlesRouter