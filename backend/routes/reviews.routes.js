import express from "express";
import {getReviews} from "../dataAccess/ReviewsDataAccess.js"


const reviewsRouter = express.Router();


reviewsRouter.route('/article')
    .get(async (req, res) => { res.status(200).json(await getReviews())}); 


    export default reviewsRouter