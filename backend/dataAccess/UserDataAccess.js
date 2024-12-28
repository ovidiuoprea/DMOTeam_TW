import User from "../entities/User.js";
import conn from "../dbConfig.js";

/**
 * If ORM fails, call this as getUser(false), as it will switch to the default MySQL promise-based pool
 * @route GET /user-api/user
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

/**
 * Use JSON.stringify() in React to provide consistent data.
 * @route POST /user-api/user with body
 * @param {type: JSON { name: " ", email: " ", password: " ", role: " "}} user 
 * @param {type: boolean} ORM 
 * @returns User inserted in the database.
 */

async function createUser(user, ORM = true) {
    if(!ORM) { 
        const sql = "INSERT INTO Users SET ?";
        const [result] = await conn.query(sql, user);

        // Return data similar to ORM result:
        return {user_id: result.insertId, ...user};
    }
    else {
        return await User.create(user);
    }
}

export {
    getUser,
    createUser
}