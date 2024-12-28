import express from 'express';
import mysql from 'mysql2';
import conn from './dbConfig.js';
import dotenv from 'dotenv';

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

app.get("/test", (req, res, next)=> {
    const sql = "SELECT * FROM test_table;"
    try {
        conn.query(sql, (error, results, fields) => {
            if (error) 
                throw error;
    
            // console.log(fields)
            console.log(results);
            res.status(200).json({"data": results});  
        });
    }
    catch (error) { 
        console.error(error);
    }
})