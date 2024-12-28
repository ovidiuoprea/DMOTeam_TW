import express from "express";
import { createUser, getUser } from "../dataAccess/UserDataAccess.js";

const usersRouter = express.Router();

usersRouter.route('/user')
    .get(async (req, res) => { res.status(200).json(await getUser())});

usersRouter.route('/user')
    .post(async (req, res) => { res.status(201).json(await createUser(req.body, false))});

export default usersRouter;