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

async function getReviewerUsers(ORM = true) {
    if (!ORM) {
        const sql = "SELECT * FROM Users WHERE role = 'Reviewer'"; 
        const [rows] = await conn.query(sql);
        return rows;
    } else {
        console.log("With ORM:");
        return await User.findAll({
            where: {
                role: 'Reviewer' 
            }
        });
    }
}

/**
 * Use JSON.stringify() in React to provide consistent data.
 * @route POST /user-api/user with body
 * @param {type: JSON { name: " ", email: " ", password: " ", role: " "}} user 
 * @param {type: boolean} ORM true = use Sequelize ORM, false = use MySQL pool 
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

/**
 * @route GET /user-api/user/:user_id;
 * @param {type: Number} id Requested user's user_id
 * @param {type: Boolean} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns User with specified user_id
 */
async function getUserById(user_id, ORM = true) {
    if(!ORM) { 
        const sql = "SELECT * FROM Users WHERE user_id = ?";
        const [rows] = await conn.query(sql, user_id);

        // If no user is found, Sequelize returns null, so I'm mimicking the behavior here too:
        if(rows.length == 0) {
            return null;
        }

        return rows;
    }
    else {
        return await User.findByPk(user_id);
    }
}

/**
 * @route PUT /user-api/user/:user_id with body
 * @param {*} id Updated user's user_id
 * @param {*} updatedUserData New user data for updated user
 * @param {*} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns {error: boolean, message: "", object: updated user data in JSON format}
 */

async function updateUser(id, updatedUserData, ORM=true) {

    if(parseInt(id) !== updatedUserData.user_id) {
        return {error: true, message: "Provided user_id does not match user!"}
    }

    let existingUser = await getUserById(id);
    if(!existingUser) {
        return {error: true, message: "User with user_id not found"};
    }

    if(!ORM) { 
        try{ 
            const sql = "UPDATE Users SET ? WHERE user_id = ?";
            const [rows] = await conn.query(sql, updatedUserData, id);
            return {error: false, message: "User successfully updated", object: [...updatedUserData]}
        }
        catch(error) { 
            console.error(error);
        } 
    }
    else {
        return {error: false, message: "User successfuly updated", object: await existingUser.update(updatedUserData)};
    }
}

async function deleteUser (id, ORM = true) { 
    let deleteEntity = await getUserById(id);
    if(!deleteEntity) { 
        return {error: true, message: "No user found"};
    }

    if(!ORM) { 
        try {
            const sql = "DELETE FROM Users WHERE user_id = ?";
            const [rows] = await conn.query(sql, id);
            return {error: false, message: "User successfully deleted", object: deleteEntity}
        }
        catch (error) {
            console.error(error);
        }
    }
    else {
        return {error: false, message: "User successfully deleted", object: await deleteEntity.destroy()};
    }
}

/**
 * @route POST /user-api/user with body
 * @param {*} provided_email 
 * @param {*} password 
 * @returns { error: boolean, message: "", object: user || null}
 */
async function login (provided_email, password, ORM = true) { 
    if(!ORM){
        //TODO: Login without ORM
    }
    else {
        const user = await User.findOne({where: {email: provided_email}});
        if(!user) { 
            return {error: true, message: "User not found", object: null}
        }
        if(password != user.password) {
            return {error: true, message: "Passwords don't match", object: null};
        }
        return {error: false, message: "Login successful", object: user};
    }
}

async function getUserByEmail (provided_email, ORM = true ) { 
    if(!ORM) {

    }
    else{
        const user = await User.findOne({where: {email: provided_email}});
        if(!user) { 
            return {error: true, message: "User not found", object: null}
        }

        return {error: false, message: "Found user", object: user};
    }
} 

export {
    getUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    login,
    getUserByEmail,
    getReviewerUsers
}