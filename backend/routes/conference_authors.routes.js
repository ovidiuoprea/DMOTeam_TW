import express from "express";
import { getConferenceAuthor, createConferenceAuthor, getConferenceAuthorById, updateConferenceAuthor, deleteConferenceAuthor, getAuthorsByConference } from "../dataAccess/ConferenceAuthorDataAccess.js";

const conferencesRouter = express.Router();

conferencesRouter.route('/conference-author')
    .get(async (req, res) => { res.status(200).json(await getConferenceAuthor())});

conferencesRouter.route('/conference-author')
    .post(async (req, res) => { 
        const conference_author = req.body;
        if(!conference_author || Object.keys(conference_author).length == 0) {
            return res.status(400).json({"message": "Invalid request"});
        }
        if(!conference_author.conference_id || !conference_author.author_id) {
            res.status(400).json({"message": "Invalid conference_author object"});
        }
        else {
            res.status(201).json(await createConferenceAuthor(req.body))
        }
    });

conferencesRouter.route('/conference-author/:ca_id')
    .get(async (req, res) => { 
        const id = req.params.ca_id;
        res.status(200).json(await getConferenceAuthorById(id));
    });

conferencesRouter.route('/conference-author/:ca_id')
    .put(async (req, res) => {
        const updatedConferenceData = req.body;
        const ca_id = req.params.ca_id;

        if(!updatedConferenceData || Object.keys(updatedConferenceData).length == 0) {
            return res.status(400).json({"message": "Invalid request"});
        }

        let result = await updateConferenceAuthor(ca_id, updatedConferenceData);

        if(result.error) {
            res.status(400).json(result.message);
        }
        else {
            res.status(200).json(result.object);
        }
    });

conferencesRouter.route('/conference-author/:ca_id')
    .delete(async (req, res) => { 
        const ca_id = req.params.ca_id;
        
        let result = await deleteConferenceAuthor(ca_id);

        if(result.error) {
            res.status(400).json(result.message);
        }
        else {
            res.status(200).json(result.object);
        }

    })

conferencesRouter.route('/conference-author/authors/:conference_id')
    .get(async (req, res) => { 
        const conference_id = req.params.conference_id;

        if(!conference_id) {
            return res.status(400).json({"message": "Invalid request"});
        }
        const result = await getAuthorsByConference(conference_id);

        if(result.error) {
            return res.status(400).json(result.message);
        }
        else {
            return res.status(200).json({message: result.message, conference_author: result.object});
        }
    })


export default conferencesRouter;
