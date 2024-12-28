import express from "express";
import { getUser } from "../dataAccess/UserDataAccess.js";

const usersRouter = express.Router();

usersRouter.route('/user')
    .get(async (req, res) => { res.status(200).json(await getUser())});

export default usersRouter;