import Conference_author from "../entities/Conference_author.js";
import conn from "../dbConfig.js";

/**
 * If ORM fails, call this as getConferenceAuthor(false), as it will switch to the default MySQL promise-based pool
 * @route GET /conference-author-api/conference-author
 * @param {type: boolean} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns {type: any[]} Array with all the ConferenceAuthors in the DB.
 */
async function getConferenceAuthor(ORM = true) {
    if(!ORM) {
        const sql = "SELECT * FROM conference_authors";
        const [rows] = await conn.query(sql);
        return rows;
    }
    else {
        console.log("With ORM:")
        return await Conference_author.findAll();
    }
}

/**
 * Use JSON.stringify() in React to provide consistent data.
 * @route POST /conference-author-api/conference-author with body
 * @param {type: JSON { ca_id: " ", conference_id: " ", author_id = " " }} conference_author 
 * @param {type: boolean} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns Conference_author inserted in the database.
 */

async function createConferenceAuthor(conference_author, ORM = true) {
    if(!ORM) { 
        const sql = "INSERT INTO conference_authors SET ?";
        const [result] = await conn.query(sql, conference_author);

        // Return data similar to ORM result:
        return {ca_id: result.insertId, ...conference_author};
    }
    else {
        return await Conference_author.create(conference_author);
    }
}

/**
 * @route GET /conference-author-api/conference-author/:ca_id;
 * @param {type: Number} id Requested Conference_author's ca_id
 * @param {type: Boolean} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns Conference_author with specified ca_id
 */
async function getConferenceAuthorById(ca_id, ORM = true) {
    if(!ORM) { 
        const sql = "SELECT * FROM Conference_Authors WHERE ca_id = ?";
        const [rows] = await conn.query(sql, ca_id);

        // If no conference_author is found, Sequelize returns null, so I'm mimicking the behavior here too:
        if(rows.length == 0) {
            return null;
        }

        return rows;
    }
    else {
        return await Conference_author.findByPk(ca_id);
    }
}

/**
 * @route PUT /conference-author-api/conference_author/:ca_id with body
 * @param {*} id Updated Conference_author's ca_id
 * @param {*} updatedConferenceAuthorData New Conference_author data for updated conference_author
 * @param {*} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns {error: boolean, message: "", object: updated conference_author data in JSON format}
 */

async function updateConferenceAuthor(id, updatedConferenceAuthorData, ORM = true) {

    if(parseInt(id) !== updatedConferenceAuthorData.ca_id) {
        return {error: true, message: "Provided ca_id does not match Conference_author!"}
    }

    let existingConferenceAuthor = await getConferenceAuthorById(id);
    if(!existingConferenceAuthor) {
        return {error: true, message: "Conference_author with ca_id not found"};
    }

    if(!ORM) { 
        try{ 
            const sql = "UPDATE Conference_authors SET ? WHERE ca_id = ?";
            const [rows] = await conn.query(sql, updatedConferenceAuthorData, id);
            return {error: false, message: "Conference_author successfully updated", object: [...updatedConferenceAuthorData]}
        }
        catch(error) { 
            console.error(error);
        } 
    }
    else {
        return {error: false, message: "Conference_author successfuly updated", object: await existingConferenceAuthor.update(updatedConferenceAuthorData)};
    }
}

async function deleteConferenceAuthor (id, ORM = true) { 
    let deleteEntity = await getConferenceAuthorById(id);
    if(!deleteEntity) { 
        return {error: true, message: "No conference_author found"};
    }

    if(!ORM) { 
        try {
            const sql = "DELETE FROM Conference_authors WHERE ca_id = ?";
            const [rows] = await conn.query(sql, id);
            return {error: false, message: "Conference_author successfully deleted", object: deleteEntity}
        }
        catch (error) {
            console.error(error);
        }
    }
    else {
        return {error: false, message: "Conference_author successfully deleted", object: await deleteEntity.destroy()};
    }
}

/**
* @route GET /conference-author-api/authors/:ca_id with body
 * @param {*} provided_conference_id 
 * @param {*} ORM 
 * @returns 
 */
async function getAuthorsByConference (provided_conference_id, ORM = true ) { 
    if(!ORM) {

    }
    else{
        const conference_author = await Conference_author.findAll({where: {conference_id: provided_conference_id}});
        if(!conference_author) { 
            return {error: true, message: "Authors of Conference not found", object: null}
        }

        return {error: false, message: `Found Authors of Conference ${provided_conference_id}`, object: conference_author};
    }
} 

export {
    getConferenceAuthor,
    createConferenceAuthor,
    getConferenceAuthorById,
    updateConferenceAuthor,
    deleteConferenceAuthor,
    getAuthorsByConference
}
