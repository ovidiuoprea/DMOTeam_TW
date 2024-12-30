import express from "express";
import {getArticles} from "../dataAccess/ArticlesDataAccess.js"


const articlesRouter = express.Router();


articlesRouter.route('/article')
    .get(async (req, res) => { res.status(200).json(await getArticles())}); 


    export default articlesRouter