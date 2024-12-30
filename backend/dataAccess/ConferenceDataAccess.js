import Conference from "../entities/Conference.js";
import ConferenceAuthor from "../entities/ConferenceAuthor.js"
import conn from "../dbConfig.js";
import { Sequelize } from "sequelize";
import User from "../entities/User.js";


async function associationsTest() {
    return Conference.findOne({
        where: {conference_id: 1},
        include: [
            { model: User, attributes: ["name"]}
        ]
    })
}


/**
 * If ORM fails, call this as getConference(false), as it will switch to the default MySQL promise-based pool
 * @route GET /conference-api/conference
 * @param {type: boolean} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns {type: any[]} Array with all the Conferences in the DB.
 */
async function getConference(ORM = true) {
    if(!ORM) {
        const sql = "SELECT * FROM Conferences";
        const [rows] = await conn.query(sql);
        return rows;
    }
    else {
        console.log("With ORM:")
        return await Conference.findAll();
    }
}

/**
 * Use JSON.stringify() in React to provide consistent data.
 * @route POST /conference-api/conference with body
 * @param {type: JSON { organizer_id: " "}} conference 
 * @param {type: boolean} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns Conference inserted in the database.
 */

async function createConference(conference, ORM = true) {
    if(!ORM) { 
        const sql = "INSERT INTO Conferences SET ?";
        const [result] = await conn.query(sql, conference);

        // Return data similar to ORM result:
        return {conference_id: result.insertId, ...conference};
    }
    else {
        return await Conference.create(conference);
    }
}

/**
 * @route GET /conference-api/conference/:conference_id;
 * @param {type: Number} id Requested Conference's conference_id
 * @param {type: Boolean} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns Conference with specified conference_id
 */
async function getConferenceById(conference_id, ORM = true) {
    if(!ORM) { 
        const sql = "SELECT * FROM Conferences WHERE conference_id = ?";
        const [rows] = await conn.query(sql, conference_id);

        // If no conference is found, Sequelize returns null, so I'm mimicking the behavior here too:
        if(rows.length == 0) {
            return null;
        }

        return rows;
    }
    else {
        return await Conference.findByPk(conference_id);
    }
}

/**
 * @route PUT /conference-api/conference/:conference_id with body
 * @param {*} id Updated Conference's conference_id
 * @param {*} updatedConferenceData New Conference data for updated conference
 * @param {*} ORM true = use Sequelize ORM, false = use MySQL pool 
 * @returns {error: boolean, message: "", object: updated conference data in JSON format}
 */

async function updateConference(id, updatedConferenceData, ORM = true) {

    if(parseInt(id) !== updatedConferenceData.conference_id) {
        return {error: true, message: "Provided conference_id does not match Conference!"}
    }

    let existingConference = await getConferenceById(id);
    if(!existingConference) {
        return {error: true, message: "Conference with conference_id not found"};
    }

    if(!ORM) { 
        try{ 
            const sql = "UPDATE Conferences SET ? WHERE conference_id = ?";
            const [rows] = await conn.query(sql, updatedConferenceData, id);
            return {error: false, message: "Conference successfully updated", object: [...updatedConferenceData]}
        }
        catch(error) { 
            console.error(error);
        } 
    }
    else {
        return {error: false, message: "Conference successfuly updated", object: await existingConference.update(updatedConferenceData)};
    }
}

async function deleteConference (id, ORM = true) { 
    let deleteEntity = await getConferenceById(id);
    if(!deleteEntity) { 
        return {error: true, message: "No conference found"};
    }

    if(!ORM) { 
        try {
            const sql = "DELETE FROM Conferences WHERE conference_id = ?";
            const [rows] = await conn.query(sql, id);
            return {error: false, message: "Conference successfully deleted", object: deleteEntity}
        }
        catch (error) {
            console.error(error);
        }
    }
    else {
        return {error: false, message: "Conference successfully deleted", object: await deleteEntity.destroy()};
    }
}

/**
* @route PUT /conference-api/conference/organizer/:organizer_id with body
 * @param {*} provided_organizer_id 
 * @param {*} ORM 
 * @returns 
 */
async function getConferencesByOrganizerId (provided_organizer_id, ORM = true ) { 
    if(!ORM) {

    }
    else{
        const conference = await Conference.findAll({where: {organizer_id: provided_organizer_id}});
        if(!conference) { 
            return {error: true, message: "Conferences not found", object: null}
        }

        return {error: false, message: "Found Conferences", object: conference};
    }
} 

async function getAvailableConferences(userId, ORM = true) {
    if (!ORM) {
        const sql = `
            SELECT c.* 
            FROM Conferences c
            WHERE c.conference_id NOT IN (
                SELECT ca.conference_id 
                FROM Conference_authors ca 
                WHERE ca.author_id = ?
            );
        `;
        const [rows] = await conn.query(sql, [userId]);
        return rows;
    } else {
        const conferences = await Conference.findAll({
            where: {
                conference_id: {
                    [Sequelize.Op.notIn]: Sequelize.literal(`
                        (SELECT ca.conference_id 
                        FROM Conference_authors ca 
                        WHERE ca.author_id = ${userId})
                    `),
                },
            },
        });

        // Returnează doar câmpurile relevante
        return conferences.map(conf => ({
            conference_id: conf.conference_id,
            organizer_id: conf.organizer_id,
        }));
    }
}


async function getConferencesForAuthor(authorId, ORM = true) {
    if (!ORM) {
        const sql = `
            SELECT c.* 
            FROM Conferences c
            INNER JOIN Conference_authors ca ON c.conference_id = ca.conference_id
            WHERE ca.author_id = ?;
        `;
        const [rows] = await conn.query(sql, [authorId]);   
        return rows;
    } else {
        const conferences = await Conference.findAll({
            include: [
                {
                    model: ConferenceAuthor,
                    required: true,
                    where: { author_id: authorId }, 
                }
            ]
        });

        //return conferences    --> in cazul asta retruneaza conferintele dar cu tot cu autor

        return conferences.map(conf => ({
            conference_id: conf.conference_id,
            organizer_id: conf.organizer_id,
        }));
    }
}

export {
    associationsTest,
    getConference,
    createConference,
    getConferenceById,
    updateConference,
    deleteConference,
    getConferencesByOrganizerId,
    getConferencesForAuthor,
    getAvailableConferences,
}
