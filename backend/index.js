import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { getUser } from './dataAccess/UserDataAccess.js';

import usersRouter from './routes/users.routes.js';

const app = express();
dotenv.config();

export const port = process.env.PORT ? process.env.PORT : 3600;

app.use(express.json());
app.use(express.static('build'));

app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
});

app.get("/", (req, res, next) => {
   let path = path.resolve();
   res.sendFile(path.join(path, "build", "index.html"));
});

app.use("/user-api", usersRouter);
