import express from "express";
import { createUser, deleteUser, getUser, getUserById, getUserByEmail, login, updateUser, getUserByRole, getArticlesByReviewerID } from "../dataAccess/UserDataAccess.js";

const usersRouter = express.Router();

usersRouter.route('/user')
    .get(async (req, res) => { res.status(200).json(await getUser())});

usersRouter.route('/userreviewer')
    .get(async (req,res)=>{ res.status(200).json (await getUserByRole("Reviewer"))})

usersRouter.route('/user')
    .post(async (req, res) => { 
        const user = req.body;
        if(!user || Object.keys(user).length == 0) {
            return res.status(400).json({"message": "Invalid request"});
        }
        if(!user.name || !user.email || !user.password || !user.role) {
            res.status(400).json({"message": "Invalid user object"});
        }
        else {
            res.status(201).json(await createUser(req.body))
        }
    });

usersRouter.route('/user/:user_id')
    .get(async (req, res) => { 
        const id = req.params.user_id;
        res.status(200).json(await getUserById(id));
    });

usersRouter.route('/user-role/:role')
    .get(async (req, res) => { 
        const role = req.params.role;
        res.status(200).json(await getUserByRole(role));
    })

usersRouter.route('/user/:user_id')
    .put(async (req, res) => {
        const updatedUserData = req.body;
        const user_id = req.params.user_id;

        if(!updatedUserData || Object.keys(updatedUserData).length == 0) {
            return res.status(400).json({"message": "Invalid request"});
        }

        let result = await updateUser(user_id, updatedUserData);

        if(result.error) {
            res.status(400).json(result.message);
        }
        else {
            res.status(200).json(result.object);
        }
    });

usersRouter.route('/user/:user_id')
    .delete(async (req, res) => { 
        const user_id = req.params.user_id;
        
        let result = await deleteUser(user_id);

        if(result.error) {
            res.status(400).json(result.message);
        }
        else {
            res.status(200).json(result.object);
        }

    })

usersRouter.route('/login')
    .post(async (req, res) => {
        const {email, password} = req.body;

        if(!email || !password) { 
            return res.status(400).json({"message": "Invalid request"});
        }
        let result = await login(email, password);

        if(result.error) {
            return res.status(400).json(result.message);
        }
        else {
            return res.status(200).json({message: result.message, user: result.object})
        }
    })

usersRouter.route('/userEmail/:email')
    .get(async (req, res) => { 
        const email = req.params.email;

        if(!email) {
            return res.status(400).json({"message": "Invalid request"});
        }
        const result = await getUserByEmail(email);

        if(result.error) {
            return res.status(400).json(result.message);
        }
        else {
            return res.status(200).json({message: result.message, user: result.object});
        }
    })

usersRouter.route('/article-by-reviewer-id/:reviewer_id')
    .get(async (req, res) => { 
        const reviewer_id = req.params.reviewer_id;
        const result = await getArticlesByReviewerID(reviewer_id);

        if(!result) { 
            return res.status(400).json({message: "Not a reviewer"});
        }
        return res.status(200).json(result);
    })

export default usersRouter;