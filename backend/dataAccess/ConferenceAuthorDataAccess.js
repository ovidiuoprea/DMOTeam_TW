import ConferenceAuthor from "../entities/ConferenceAuthor.js";
import conn from "../dbConfig.js";
import Conference from "../entities/Conference.js";
import Article from "../entities/Article.js";
import User from "../entities/User.js";

async function associationsTest() {
    return ConferenceAuthor.findOne({
        where: {ca_id: 1},
        include: [
            { model: Conference, attributes: ["conference_id"]},
            { model: User, attributes: ["name"]}
        ]
    })
}

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
        return await ConferenceAuthor.findAll();
    }
}

/**
 * Use JSON.stringify() in React to provide consistent data.
 * @route POST /conference-author-api/conference-author with body
 * @param {type: JSON { ca_id: " ", conference_id: " ", author_id = " " }} conferenceAuthor 
 * @param {type: boolean} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns ConferenceAuthor inserted in the database.
 */

async function createConferenceAuthor(conferenceAuthor, ORM = true) {
    if(!ORM) { 
        const sql = "INSERT INTO conference_authors SET ?";
        const [result] = await conn.query(sql, conferenceAuthor);

        // Return data similar to ORM result:
        return {ca_id: result.insertId, ...conferenceAuthor};
    }
    else {
        return await ConferenceAuthor.create(conferenceAuthor);
    }
}

/**
 * @route GET /conference-author-api/conference-author/:ca_id;
 * @param {type: Number} id Requested ConferenceAuthor's ca_id
 * @param {type: Boolean} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns ConferenceAuthor with specified ca_id
 */
async function getConferenceAuthorById(ca_id, ORM = true) {
    if(!ORM) { 
        const sql = "SELECT * FROM conference_authors WHERE ca_id = ?";
        const [rows] = await conn.query(sql, ca_id);

        // If no conferenceAuthor is found, Sequelize returns null, so I'm mimicking the behavior here too:
        if(rows.length == 0) {
            return null;
        }

        return rows;
    }
    else {
        return await ConferenceAuthor.findByPk(ca_id);
    }
}

/**
 * @route PUT /conference-author-api/conferenceAuthor/:ca_id with body
 * @param {*} id Updated ConferenceAuthor's ca_id
 * @param {*} updatedConferenceAuthorData New ConferenceAuthor data for updated conferenceAuthor
 * @param {*} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns {error: boolean, message: "", object: updated conferenceAuthor data in JSON format}
 */

async function updateConferenceAuthor(id, updatedConferenceAuthorData, ORM = true) {

    if(parseInt(id) !== updatedConferenceAuthorData.ca_id) {
        return {error: true, message: "Provided ca_id does not match conferenceAuthor!"}
    }

    let existingConferenceAuthor = await getConferenceAuthorById(id);
    if(!existingConferenceAuthor) {
        return {error: true, message: "conferenceAuthor with ca_id not found"};
    }

    if(!ORM) { 
        try{ 
            const sql = "UPDATE conference_authors SET ? WHERE ca_id = ?";
            const [rows] = await conn.query(sql, updatedConferenceAuthorData, id);
            return {error: false, message: "conferenceAuthor successfully updated", object: [...updatedConferenceAuthorData]}
        }
        catch(error) { 
            console.error(error);
        } 
    }
    else {
        return {error: false, message: "conferenceAuthor successfuly updated", object: await existingConferenceAuthor.update(updatedConferenceAuthorData)};
    }
}

async function deleteConferenceAuthor (id, ORM = true) { 
    let deleteEntity = await getConferenceAuthorById(id);
    if(!deleteEntity) { 
        return {error: true, message: "No conferenceAuthor found"};
    }

    if(!ORM) { 
        try {
            const sql = "DELETE FROM conference_authors WHERE ca_id = ?";
            const [rows] = await conn.query(sql, id);
            return {error: false, message: "ConferenceAuthor successfully deleted", object: deleteEntity}
        }
        catch (error) {
            console.error(error);
        }
    }
    else {
        return {error: false, message: "ConferenceAuthor successfully deleted", object: await deleteEntity.destroy()};
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
        const conferenceAuthor = await ConferenceAuthor.findAll({where: {conference_id: provided_conference_id}});
        if(!conferenceAuthor) { 
            return {error: true, message: "Authors of Conference not found", object: null}
        }

        return {error: false, message: `Found Authors of Conference ${provided_conference_id}`, object: conferenceAuthor};
    }
} 

export {
    associationsTest,
    getConferenceAuthor,
    createConferenceAuthor,
    getConferenceAuthorById,
    updateConferenceAuthor,
    deleteConferenceAuthor,
    getAuthorsByConference
}
