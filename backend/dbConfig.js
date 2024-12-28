import mysql from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

export default conn;