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
 * Get all the users with specified role
 * @route GET /user-api/user-role/:
 * @param {*} role 
 * @param {*} ORM 
 * @returns Array containing users with the specified role.
 */
async function getUserByRole(role, ORM=true) { 
    if(!ORM) {
        const sql = "SELECT * FROM Users where role = ?";
        const [rows] = await conn.query(sql);
        return rows;
    }
    else {
        return await User.findAll({
            where: {
                role: role
            }
        })
    }
}


/**
 * Get all the users with role="Reviewer"
 * @route GET /user-api/userreviewer
 * @param {*} ORM 
 * @returns All the users with role="Reviewer"
 */
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

/**
 * Get all the articles assigned to user specified by reviewer_id
 * @route GET /user-api/article-by-reviewer-id/:reviewer_id
 * @param {*} reviewer_id User_id for whom to get articles for.
 * @param {*} ORM 
 * @returns {articles: JSON} Articles assigned to user with user_id = reviewer_id
 */
async function getArticlesByReviewerID (reviewer_id, ORM = false) {
    if(!ORM) {
        try{
            const user = await getUserById(reviewer_id);
            if(!user.role === "Reviewer") {
                return null;
            }

            const sql = `
            SELECT 
                a.article_id, a.title, a.content, a.conference_id, a.author_id, isArticleApproved(a.article_id) AS is_approved
            FROM Articles a 
            JOIN Reviews r ON a.article_id = r.article_id 
            WHERE r.reviewer_id = ?`;

            const [rows] = await conn.query(sql, reviewer_id);
            return rows;
        }
        catch(error) {
            console.error(error);
        }
    }
    else {
        //TODO: ORM.
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
    getReviewerUsers,
    getUserByRole,
    getArticlesByReviewerID
}