import express from "express";
import { getReviews, associationsTest } from "../dataAccess/ReviewsDataAccess.js"


const reviewsRouter = express.Router();

reviewsRouter.route('/review')
    .get(async (req, res) => { res.status(200).json(await getReviews())}); 

reviewsRouter.route('/associations-test')
    .get(async (req, res) => { res.status(200).json(await associationsTest())}); 


export default reviewsRouter