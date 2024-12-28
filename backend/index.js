import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const port = 3600;

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

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