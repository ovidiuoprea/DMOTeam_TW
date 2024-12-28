import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const dbORM = new Sequelize({
    dialect: "mysql",
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    logging: false,

    define: {
        timestamps: false,
        freezeTableName: true
    }
});

export default dbORM;