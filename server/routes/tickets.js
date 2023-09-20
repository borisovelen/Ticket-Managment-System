const express = require("express");
const axios = require("axios");
const router = express.Router();
const connection = require("../database").dbConnection;
require("dotenv").config();

const TICKETS_TABLE_NAME = process.env.DATABASE_TICKETS_TABLE_NAME;
const USERS_TABLE_NAME = process.env.DATABASE_USERS_TABLE_NAME;
const SHORT_DESC_MAX_LENGTH = 50;

//JIRA ENV
const JIRA_API_KEY = process.env.JIRA_API_KEY;
const JIRA_DOMAIN_NAME = process.env.JIRA_DOMAIN_NAME;
const JIRA_USER = process.env.JIRA_USER;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;
const JIRA_API_URL = `https://${JIRA_DOMAIN_NAME}/rest/api/3/search?jql=project=${JIRA_PROJECT_KEY}&maxResults=100`;

const auth = {
    username: JIRA_USER,
    password: JIRA_API_KEY
}

async function jiraGetIssues() {
    const jiraIssuesList = [];
    const statusMap = new Map([
        [10010, "New"],
        [10011, "In Progress"],
        [10012, "Done"],
        [10013, "Review"]
    ]);
    try {
        await axios.get(JIRA_API_URL, {
            auth: auth,
            headers: {
                'Content-Tyzpe': 'application/json'
            }
        }).then(response => response.data).then(jiraData => {
            console.log(`Total issues from Jira: ${jiraData.total}`);
            console.log(`------------------------------------`);
            jiraData.issues.forEach(issue => {
                jiraIssuesList.push({
                    id: issue.id,
                    createdOn: new Date(issue.fields.created).toISOString().slice(0, 19).replace('T', ' '),
                    updatedOn: new Date(issue.fields.updated).toISOString().slice(0, 19).replace('T', ' '),
                    state: statusMap.get(Number(issue.fields.status.id)),
                    shortDesc: issue.fields.summary,
                    description: issue.fields.description.content[0].content[0].text
                })
            });
        });

        jiraIssuesList.forEach(jiraIssue => {
            const jiraInsertQuery = `INSERT INTO ${TICKETS_TABLE_NAME} (jira_id,created_on,updated_on,state,short_desc,description) VALUES (?,?,?,?,?,?);`;
            const jiraUpdateQuery = `UPDATE ${TICKETS_TABLE_NAME} SET created_on=?, updated_on=?, state=?, short_desc=?, description=? WHERE jira_id=?`;
            connection.query(jiraInsertQuery, [jiraIssue.id, jiraIssue.createdOn, jiraIssue.updatedOn, jiraIssue.state, jiraIssue.shortDesc, jiraIssue.description], (err, row) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        console.log("Checking for issue update...");
                        connection.query(jiraUpdateQuery, [jiraIssue.createdOn, jiraIssue.updatedOn, jiraIssue.state, jiraIssue.shortDesc, jiraIssue.description, jiraIssue.id], (err, row) => {
                            if (err) throw err;
                            else console.log("Successfully updated!");
                        })
                    } else throw err;
                } else console.log('Successfully updated databse with jira issue!');
            })
        })
        return "Jira issues loaded successfully!";
    } catch (err) {
        return "Error loading jira issues: " + err;
    }
}


//Tickets logics
//Get All tickets
router.get("/", (req, res) => {
    if (req?.session?.role) {
        const reqOffset = Number(req.query.offset) >= 0 ? Number(req.query.offset) : false;
        const reqLimit = Number(req.query.limit) > 0 ? Number(req.query.limit) : false;
        const isAdmin = req.session.role === "Admin";

        const limit = reqLimit ? 'LIMIT ' + reqLimit : '';
        const offset = reqOffset ? 'OFFSET ' + reqOffset : '';
        const adminCheck = (isAdmin ? `` : `WHERE ${TICKETS_TABLE_NAME}.user=${req?.session?.userID}`);

        const orderType = (req.query?.orderType && req.query?.orderType !== "undefined") ? req.query.orderType : "";
        const orderBy = (orderType !== "" && req.query?.orderBy !== "undefiend") ? "ORDER BY " + TICKETS_TABLE_NAME + "." + req.query.orderBy : "";

        const query = `SELECT ${TICKETS_TABLE_NAME}.id, ${TICKETS_TABLE_NAME}.short_desc AS shortDesc, ${TICKETS_TABLE_NAME}.description, u1.fullname AS createdBy, ${TICKETS_TABLE_NAME}.created_on AS createdOn, u2.fullname as updatedBy, ${TICKETS_TABLE_NAME}.updated_on AS updatedOn, ${TICKETS_TABLE_NAME}.state, ${TICKETS_TABLE_NAME}.priority FROM ${TICKETS_TABLE_NAME} LEFT JOIN ${USERS_TABLE_NAME} u1 ON u1.id=${TICKETS_TABLE_NAME}.user LEFT JOIN ${USERS_TABLE_NAME} u2 ON u2.id=${TICKETS_TABLE_NAME}.updated_by ${adminCheck} ${orderBy} ${orderType} ${limit} ${offset};`;

        connection.query(query, (err, row) => {
            if (err) {
                console.log(err);
                res.status(500).send(`There is a problem with connection: ${err.code}`);
            }
            else if (row.length === 0) {
                if (!isAdmin) {
                    res.send("You don't have any tickets!")
                } else res.send("There are no tickets!");;
            } else res.send(row);
        });
    } else {
        res.send("You have to be logged in to see the tickets!");
    }
});
//Add new ticket
router.post("/", (req, res) => {
    if (req?.session?.role) {
        const newTicket = req.body;
        if (newTicket?.shortDesc?.length === 0) {
            res.status(406).send("Short Description field can't be empty!")
        } else if (newTicket?.shortDesc?.length > SHORT_DESC_MAX_LENGTH) {
            res.status(406).send(`Short Description must be less than ${SHORT_DESC_MAX_LENGTH} characters!`);
        }
        else {
            connection.query(`INSERT INTO ${TICKETS_TABLE_NAME}(short_desc,description,user,created_on,state,priority) VALUES (?,?,?,CURRENT_TIMESTAMP(),"New",?);`, [newTicket.shortDesc, newTicket.description, req.session.userID, newTicket.priority], (err, row) => {
                if (err) console.log(err) && res.status(500).send(`There is a problem with connection: ${err.code}`);
                else if (row.affectedRows > 0) {
                    res.send("Successfully added!");
                } else {
                    res.status(403).send("Ticket wasn't added!");
                }
            });

        }

    } else res.status(403).send("You have to be logged in to add new tickets!");
})
//Edit ticket
router.put("/", (req, res) => {
    if (req?.session?.role) {
        const updatedTicket = req.body;
        if (updatedTicket?.shortDesc?.length === 0) {
            res.status(406).send("Short Description field can't be empty!");
        } else if (updatedTicket?.shortDesc?.length > SHORT_DESC_MAX_LENGTH) {
            res.status(406).send(`Short Description must be less than ${SHORT_DESC_MAX_LENGTH} characters!`);
        } else {
            if (req?.session?.role) {
                connection.query(`UPDATE ${TICKETS_TABLE_NAME} SET short_desc=?, description=?, updated_by=?, updated_on=CURRENT_TIMESTAMP(), state=?, priority=? WHERE id=? ${req?.session?.role === "Admin" ? '' : `AND user=${req.session.userID}`}`, [updatedTicket.shortDesc, updatedTicket.description, req.session.userID, updatedTicket.state, updatedTicket.priority, updatedTicket.id], (err, row) => {
                    if (err) res.status(500).send(`There is a problem with connection: ${err.code}`);
                    else if (row.affectedRows > 0) {
                        res.send("You have successfully updated the ticket!");
                    } else {
                        if (req.session.role === "Admin") res.status(403).send("Ticket doesn't exists!");
                        else res.status(403).send("You can't edit other tickets!");
                    }
                });
            }
        }
    } else res.status(401).send("You have to be logged to edit tickets!");
});
//Delete ticket
router.delete('/:id', (req, res) => {
    if (req?.session?.role) {
        connection.query(`DELETE FROM ${TICKETS_TABLE_NAME} WHERE id=${req.params.id} ${req?.session?.role === "Admin" ? `` : `AND user=${req?.session?.userID}`}`, (err, row) => {
            if (err) res.status(500).send(`There is a problem with connection: ${err.code}`);
            else if (row.affectedRows > 0) {
                res.send("You have successfully deleted the ticket!");
            } else {
                if (req.session.role === "Admin") res.status(404).send("Ticket doesn't exists!");
                else res.status(401).send("You can delete only your tickets!");
            }
        });
    } else res.status(401).send("You don't have permissions to delete tickets!");
})

module.exports = router;