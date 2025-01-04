import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors'


import usersRouter from './routes/users.routes.js';
import conferencesRouter from './routes/conferences.routes.js';
import conferenceAuthorRouter from './routes/conferenceAuthors.routes.js';
import conferenceReviewersRouter from './routes/conferenceReviewers.routes.js';
import Associations from './entities/Associations.js';
import articlesRouter from './routes/articles.routes.js';
import reviewsRouter from './routes/reviews.routes.js';


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
app.use(express.static('build'));

app.listen(port, ()=>{
    console.log(`server running on http://localhost:${port}`);
});

app.get("/", (req, res, next) => {
   let build_path = path.resolve();
   res.sendFile(path.join(build_path, "build", "index.html"));
});

Associations();

app.use("/user-api", usersRouter);
app.use("/conference-api", conferencesRouter);
app.use("/conference-author-api", conferenceAuthorRouter);
app.use("/conference-reviewer-api", conferenceReviewersRouter);
app.use("/article-api", articlesRouter);
app.use("/review-api/", reviewsRouter);
