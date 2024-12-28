import express from "express";
import { createUser, getUser, getUserById } from "../dataAccess/UserDataAccess.js";

const usersRouter = express.Router();

usersRouter.route('/user')
    .get(async (req, res) => { res.status(200).json(await getUser())});

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

export default usersRouter;