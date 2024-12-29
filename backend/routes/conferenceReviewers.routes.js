import express from "express";
import { associationsTest, getConferenceReviewer, createConferenceReviewer, getConferenceReviewerById, updateConferenceReviewer, deleteConferenceReviewer } from "../dataAccess/ConferenceReviewersDataAccess.js";

const conferenceReviewersRouter = express.Router();

conferenceReviewersRouter.route("/associations-test")
    .get(async (req, res) => {
        return res.status(200).json(await associationsTest())
    });

conferenceReviewersRouter.route("/conference-reviewer")
    .get( async(req, res)=>{
        return res.status(200).json(await getConferenceReviewer())
    });

conferenceReviewersRouter.route("/conference-reviewer")
    .post(async(req, res)=> {
        const conference_reviewer = req.body;
        if(!conference_reviewer || Object.keys(conference_reviewer).length == 0) {
            return res.status(400).json({"message": "Invalid request"});
        }

        if(!conference_reviewer.conference_id || !conference_reviewer.reviewer_id) {
            return res.status(400).json({"message": "Invalid conference_reviewer object"});
        }

        return res.status(201).json(await createConferenceReviewer(conference_reviewer))
    });

conferenceReviewersRouter.route("/conference-reviewer/:cr_id")
    .get(async (req, res) => { 
        const cr_id = req.params.cr_id;
        res.status(200).json(await getConferenceReviewerById(cr_id));
    });

conferenceReviewersRouter.route("/conference-reviewer/:cr_id").put(async (req, res) => { 
    const cr_id = req.params.cr_id;
    const updatedConferenceReviewer = req.body;
    if(!updatedConferenceReviewer || Object.keys(updatedConferenceReviewer).length == 0) {
        return res.status(400).json({"message": "Invalid request"});
    }

    let result = await updateConferenceReviewer(cr_id, updatedConferenceReviewer);
    if(result.error) {
        return res.status(400).json(result.message);
    }
    else {
        return res.status(200).json(result.object);
    }
});

conferenceReviewersRouter.route("/conference-reviewer/:cr_id").delete(async (req, res) => { 
    const cr_id = req.params.cr_id;

    let result = await deleteConferenceReviewer(cr_id);
    if(result.error) 
        res.status(400).json(result.message);
    else 
        res.status(400).json(result.object);
});

export default conferenceReviewersRouter;
