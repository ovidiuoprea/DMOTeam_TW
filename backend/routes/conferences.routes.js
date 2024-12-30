import express from "express";
import { associationsTest, createConference, deleteConference, getConference, getConferenceById, getConferencesByOrganizerId, updateConference,getConferencesForAuthor,getAvailableConferences} from "../dataAccess/ConferenceDataAccess.js";

const conferencesRouter = express.Router();

conferencesRouter.route('/associations-test')
    .get(async (req, res) => { res.status(200).json(await associationsTest())});

conferencesRouter.route('/conference')
    .get(async (req, res) => { res.status(200).json(await getConference())});

conferencesRouter.route('/available-conferences/:userId')
    .get(async (req,res)=>{
        const userId = req.params.userId;
        res.status(200).json(await getAvailableConferences(userId))
    });

conferencesRouter.route('/conference')
    .post(async (req, res) => { 
        const conference = req.body;
        console.log("Received conference data:", req.body);

        if(!conference || Object.keys(conference).length == 0) {
            return res.status(400).json({"message": "Invalid request"});
        }
        if(!conference.organizer_id) {
            res.status(400).json({"message": "Invalid conference object"});
        }
        else {
            res.status(201).json(await createConference(req.body))
        }
    });

conferencesRouter.route('/conference/:conference_id')
    .get(async (req, res) => { 
        const id = req.params.conference_id;
        res.status(200).json(await getConferenceById(id));
    });

conferencesRouter.route('/conference/:conference_id')
    .put(async (req, res) => {
        const updatedConferenceData = req.body;
        const conference_id = req.params.conference_id;

        if(!updatedConferenceData || Object.keys(updatedConferenceData).length == 0) {
            return res.status(400).json({"message": "Invalid request"});
        }

        let result = await updateConference(conference_id, updatedConferenceData);

        if(result.error) {
            res.status(400).json(result.message);
        }
        else {
            res.status(200).json(result.object);
        }
    });

conferencesRouter.route('/conference/:conference_id')
    .delete(async (req, res) => { 
        const conference_id = req.params.conference_id;
        
        let result = await deleteConference(conference_id);

        if(result.error) {
            res.status(400).json(result.message);
        }
        else {
            res.status(200).json(result.object);
        }
    });

conferencesRouter.route('/conference/organizer/:organizer_id')
    .get(async (req, res) => { 
        const organizer_id = req.params.organizer_id;

        if(!organizer_id) {
            return res.status(400).json({"message": "Invalid request"});
        }
        const result = await getConferencesByOrganizerId(organizer_id);

        if(result.error) {
            return res.status(400).json(result.message);
        }
        else {
            return res.status(200).json({message: result.message, conference: result.object});
        }
    })

conferencesRouter.route('/conference/author/:author_id')
    .get(async(req,res)=>{
        const author_id= req.params.author_id

        if(!author_id){
            return res.status(400).json({"message": "Invalid request"});
        }
        const result= await getConferencesForAuthor(author_id);
        
        return res.status(200).json(result);
    })


export default conferencesRouter;
