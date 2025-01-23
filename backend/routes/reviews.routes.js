import express from "express";
import { getReviews, associationsTest, getReviewById, createReview, deleteReview, updateReview,getReviewsData,getReviewsByReviewerId} from "../dataAccess/ReviewsDataAccess.js"


const reviewsRouter = express.Router();

reviewsRouter.route('/review')
    .get(async (req, res) => { res.status(200).json(await getReviews())}); 

reviewsRouter.route('/review/:article_id')
    .get(async(req,res)=>{
        const article_id=req.params.article_id;
        res.status(200).json(await getReviewsData(article_id))
    });

reviewsRouter.route('/review-reviewer/:reviewer_id')
    .post(async(req,res)=>{
        const reviewer_id=req.params.reviewer_id;
        const article_id=req.body.article_id;
        console.log("Reviewer id: ", reviewer_id, article_id);
        res.status(200).json(await getReviewsByReviewerId(reviewer_id,article_id))
    })

reviewsRouter.route('/associations-test')
    .get(async (req, res) => { res.status(200).json(await associationsTest())}); 

reviewsRouter.route('/review')
    .post(async (req, res) => { 
        const review = req.body;
        console.log(review);
        if(!review || Object.keys(review).length === 0) {
            return res.status(400).json({"message": "Invalid request"});
        }
        if(!review.rating || !review.feedback || !review.reviewer_id || !review.article_id) {
            res.status(401).json({"message": "Invalid review object"});
        }
        else {
            res.status(201).json(await createReview(req.body))
        }
    });

reviewsRouter.route('/review/:review_id')
    .get(async (req, res) => { 
        const id = req.params.review_id;
        res.status(200).json(await getReviewById(id));
    });

reviewsRouter.route('/review/:review_id')
    .put(async (req, res) => {
        const updatedReviewData = req.body;
        const review_id = req.params.review_id;

        if(!updatedReviewData || Object.keys(updatedReviewData).length == 0) {
            return res.status(400).json({"message": "Invalid request"});
        }

        let result = await updateReview(review_id, updatedReviewData);

        if(result.error) {
            res.status(400).json(result.message);
        }
        else {
            res.status(200).json(result.object);
        }
    });

reviewsRouter.route('/review/:review_id')
    .delete(async (req, res) => { 
        const review_id = req.params.review_id;
        
        let result = await deleteReview(review_id);

        if(result.error) {
            res.status(400).json(result.message);
        }
        else {
            res.status(200).json(result.object);
        }

    });

export default reviewsRouter;