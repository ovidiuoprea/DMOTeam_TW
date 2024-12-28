import mysql from "mysql2";
import dotenv from 'dotenv';
dotenv.config();

// https://sidorares.github.io/node-mysql2/docs#using-promise-wrapper
const conn = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
}).promise();

export default conn;