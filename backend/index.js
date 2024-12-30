import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'


import usersRouter from './routes/users.routes.js';
import conferencesRouter from './routes/conferences.routes.js';
import conference_authorRouter from './routes/conference_authors.routes.js';
import conferenceReviewersRouter from './routes/conferenceReviewers.routes.js';
import Associations from './entities/Associations.js';
import articlesRouter from './routes/articles.routes.js';


const app = express();
dotenv.config();

export const port = process.env.PORT ? process.env.PORT : 3600;

const corsOptions = { 
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type']
}

app.use(cors(corsOptions));
app.use(express.json());

app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
});

app.get("/", (req, res, next) => {
    res.status(200).json({"message": "OK"});
});

Associations();

app.use("/user-api", usersRouter);
app.use("/conference-api", conferencesRouter);
app.use("/conference-author-api", conference_authorRouter);
app.use("/conference-reviewer-api", conferenceReviewersRouter);
app.use("/article-api", articlesRouter);
