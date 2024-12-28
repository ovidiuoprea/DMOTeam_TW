import User from "../entities/User.js";
import conn from "../dbConfig.js";

/**
 * If ORM fails, call this as getUser(false), as it will switch to the default MySQL promise-based pool
 * 
 * @param {type: boolean} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns {type: any[]} Array with all the users in the DB.
 */
async function getUser(ORM = true) {
    if(!ORM) {
        const sql = "SELECT * FROM Users";
        const [rows] = await conn.query(sql);
        return rows;
    }
    else {
        console.log("With ORM:")
        return await User.findAll();
    }
}

export {
    getUser
}