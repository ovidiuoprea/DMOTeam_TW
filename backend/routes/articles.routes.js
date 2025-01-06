import express from "express";
import {associationsTest, getArticles, getArticlesFromConference, createArticle, updateArticle, deleteArticle, getArticleById} from "../dataAccess/ArticlesDataAccess.js"


const articlesRouter = express.Router();


articlesRouter.route('/associations-test')
    .get(async (req, res) => { res.status(200).json(await associationsTest())}); 

articlesRouter.route('/article/:article_id')
    .get(async (req,res)=>{
        const article_id= req.params.article_id;
        res.status(200).json((await getArticleById(article_id))[0]);
    })

articlesRouter.route('/article')
    .get(async (req, res) => { res.status(200).json(await getArticles())}); 

articlesRouter.route('/article-conference/:conference_id')
    .get(async (req, res) => { 
        res.status(200).json(await getArticlesFromConference(req.params.conference_id));
    }); 

articlesRouter.route('/article')
.post(async (req, res) => { 
    const article = req.body;
    console.log("Received article data:", req.body);

    if(!article || Object.keys(article).length == 0) {
        return res.status(400).json({"message": "Invalid request"});
    }
    if(!article.title || !article.content|| !article.conference_id || !article.author_id || !article.reviewer_id1 || !article.reviewer_id2) {
        res.status(400).json({"message": "Invalid article object"});
    }
    else {
        res.status(201).json(await createArticle(req.body))
    }
});


articlesRouter.route('/article/:article_id')
.put(async (req, res) => {
    const updatedArticleData = req.body;
    const article_id = req.params.article_id;


    if(!updatedArticleData || Object.keys(updatedArticleData).length == 0) {
        return res.status(400).json({"message": "Invalid request"});
    }

    let result = await updateArticle(article_id, updatedArticleData);


    if(result.error) {
        res.status(400).json(result.message);
    }
    else {
        res.status(200).json(result.object);
    }
});

articlesRouter.route('/article/:article_id')
.delete(async (req, res) => { 
    const article_id = req.params.article_id;
    
    let result = await deleteArticle(article_id);

    if(result.error) {
        res.status(400).json(result.message);
    }
    else {
        res.status(200).json(result.object);
    }
});

    export default articlesRouter