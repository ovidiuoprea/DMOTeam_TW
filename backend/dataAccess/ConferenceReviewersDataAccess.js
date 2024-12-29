import User from '../entities/User.js'
import Conference from '../entities/Conference.js'

import ConferenceReviewer from '../entities/ConferenceReviewer.js'
import conn from '../dbConfig.js';

// TODO!: @Ovidiu Add doc comments

async function associationsTest () {
    return ConferenceReviewer.findOne({
        where: {cr_id: 1},
        include: [
            { model: User, attributes: ["name"]},
            { model: Conference, attributes: ["organizer_id"]}
        ]
    })
}


async function getConferenceReviewer (ORM = true) { 
    if(!ORM) {
        try {
            const sql = "SELECT * FROM conference_reviewers";
            const [rows] = await conn.query(sql);
            return rows;
        }
        catch(error) {
            console.error(error);
        }
    }
    else {
        return await ConferenceReviewer.findAll();
    }
}

async function createConferenceReviewer( conference_reviewer, ORM = true ) {
    if(!ORM) {
        try {
            const sql = "INSERT INTO conference_reviewers SET ?";
            const [result] = await conn.query(sql, conference_reviewer);
    
            return {cr_id: result.insertId, ...conference_reviewer}
        }
        catch(error) {
            console.error(error);
        }
    }
    else {
        return await ConferenceReviewer.create(conference_reviewer);
    }
}

async function getConferenceReviewerById(conference_reviewer_id, ORM=true) {
    if(!ORM) {
        try {
            const sql = "SELECT * FROM conference_reviewers WHERE cr_id = ?";
            const [rows] = await conn.query(sql, conference_reviewer_id);

            if(rows.length == 0) {
                return null;
            }
            return rows;
        }
        catch(error) {
            console.error(error);
        }
    }
    else {
        return await ConferenceReviewer.findByPk(conference_reviewer_id);
    }
}

// ! IMPORTANT: Not working due to reviews fk failing
// TODO: Fix this when implementing Reviews RESTful 
async function updateConferenceReviewer (id, updatedConferenceReviewer, ORM=true) {
    if(parseInt(id) !== updatedConferenceReviewer.cr_id) {
        console.log("ID: ", parseInt(id), " conferenceReviewerID: ", updatedConferenceReviewer.cr_id);
        return {error: true, message: "Provided cr_id does not match the conference reviewer"}
    }

    let existingConferenceReviewer = await getConferenceReviewerById(id);
    if(!existingConferenceReviewer) {
        return {error: true, message: "Conference reviewer with id not found!"};
    }

    if(!ORM) {
        try {
            const sql = "UPDATE conference_reviewers SET ? WHERE cr_id = ?";
            const [rows] = await conn.query(sql, updatedConferenceReviewer, id);

            return {error: false, message: "Conference reviewer successfully updated", object: [...updateConferenceReviewer]}
        }
        catch(error) {
            console.error
        }
    }
    else {
        return {error: false, message: "Conference reviewer successfully updated", object: await existingConferenceReviewer.update(updatedConferenceReviewer)};
    }
}

// ! IMPORTANT: Not working due to reviews fk failing
// TODO: Fix this when implementing Reviews RESTful 
async function deleteConferenceReviewer(id, ORM = true) {
    let deleteEntity = await getConferenceReviewerById(id);

    if(!deleteEntity) {
        return {error: true, message: "Conference reviewer with id not found!"};
    }

    if(!ORM) {
        try {
            const sql = "DELETE FROM conference_reviewers WHERE cr_id = ?"
            const [rows] = await conn.query(sql, id);
            return {error: false, message: "Conference reviewer successfully deleted", object: deleteEntity};

        }
        catch (error) {
            console.error(error);
        }
    }
    else {
        return {error: false, message: "Conference reviewer successfully deleted", object: await deleteEntity.destroy()};
    }
}

export {
    associationsTest,
    getConferenceReviewer,
    createConferenceReviewer,
    getConferenceReviewerById,
    updateConferenceReviewer,
    deleteConferenceReviewer
}