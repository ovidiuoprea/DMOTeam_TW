import express from "express";
import { getReviews, associationsTest, createReview, getReviewById } from "../dataAccess/ReviewsDataAccess.js"


const reviewsRouter = express.Router();

reviewsRouter.route('/review')
    .get(async (req, res) => { res.status(200).json(await getReviews())}); 

reviewsRouter.route('/associations-test')
    .get(async (req, res) => { res.status(200).json(await associationsTest())}); 

reviewsRouter.route('/review')
    .post(async (req, res) => { 
        const review = req.body;
        if(!review || Object.keys(review).length == 0) {
            return res.status(400).json({"message": "Invalid request"});
        }
        if(!review.reviewer_id || !review.article_id || !review.rating || !review.feedback) {
            res.status(400).json({"message": "Invalid review object"});
        }
        else {
            res.status(201).json(await createReview(review));
        }
    })

reviewsRouter.route('/review/:review_id')
    .get(async (req, res) => { 
        const review_id = req.params.review_id;
        res.status(200).json(await getReviewById(review_id));
    })

export default reviewsRouter