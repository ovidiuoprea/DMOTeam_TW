import express from 'express';
import dotenv from 'dotenv';

import { getUser } from './dataAccess/UserDataAccess.js';

import usersRouter from './routes/users.routes.js';

const app = express();
dotenv.config();

export const port = process.env.PORT ? process.env.PORT : 3600;

app.use(express.json());

app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
});

app.get("/", (req, res, next) => {
    res.status(200).json({"message": "OK"});
});

app.use("/user-api", usersRouter);
