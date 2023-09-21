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
const JIRA_STATUS_MAP = require('./jira').transitionsMap;
const JIRA_PRIORITY_MAP = require('./jira').priorityMap;

function getIdByName(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

const auth = {
    username: JIRA_USER,
    password: JIRA_API_KEY
}

// async function jiraGetIssues() {
//     const jiraIssuesList = [];
//     const statusMap = new Map([
//         [10010, "New"],
//         [10011, "In Progress"],
//         [10012, "Done"],
//         [10013, "Review"]
//     ]);
//     try {
//         await axios.get(JIRA_API_URL, {
//             auth: auth,
//             headers: {
//                 'Content-Tyzpe': 'application/json'
//             }
//         }).then(response => response.data).then(jiraData => {
//             console.log(`Total issues from Jira: ${jiraData.total}`);
//             console.log(`------------------------------------`);
//             jiraData.issues.forEach(issue => {
//                 jiraIssuesList.push({
//                     id: issue.id,
//                     createdOn: new Date(issue.fields.created).toISOString().slice(0, 19).replace('T', ' '),
//                     updatedOn: new Date(issue.fields.updated).toISOString().slice(0, 19).replace('T', ' '),
//                     state: statusMap.get(Number(issue.fields.status.id)),
//                     shortDesc: issue.fields.summary,
//                     description: issue.fields.description.content[0].content[0].text
//                 })
//             });
//         });

//         jiraIssuesList.forEach(jiraIssue => {
//             const jiraInsertQuery = `INSERT INTO ${TICKETS_TABLE_NAME} (jira_id,created_on,updated_on,state,short_desc,description) VALUES (?,?,?,?,?,?);`;
//             const jiraUpdateQuery = `UPDATE ${TICKETS_TABLE_NAME} SET created_on=?, updated_on=?, state=?, short_desc=?, description=? WHERE jira_id=?`;
//             connection.query(jiraInsertQuery, [jiraIssue.id, jiraIssue.createdOn, jiraIssue.updatedOn, jiraIssue.state, jiraIssue.shortDesc, jiraIssue.description], (err, row) => {
//                 if (err) {
//                     if (err.code === "ER_DUP_ENTRY") {
//                         console.log("Checking for issue update...");
//                         connection.query(jiraUpdateQuery, [jiraIssue.createdOn, jiraIssue.updatedOn, jiraIssue.state, jiraIssue.shortDesc, jiraIssue.description, jiraIssue.id], (err, row) => {
//                             if (err) throw err;
//                             else console.log("Successfully updated!");
//                         })
//                     } else throw err;
//                 } else console.log('Successfully updated databse with jira issue!');
//             })
//         })
//         return "Jira issues loaded successfully!";
//     } catch (err) {
//         return "Error loading jira issues: " + err;
//     }
// }


//Tickets logics
//Get All tickets
router.get("/", (req, res) => {
    if (req?.session?.role) {
        const reqOffset = Number(req.query.offset) >= 0 ? Number(req.query.offset) : false;
        const reqLimit = Number(req.query.limit) > 0 ? Number(req.query.limit) : false;
        const isAdmin = req.session.role === "Admin";

        const limit = reqLimit ? 'LIMIT ' + reqLimit : '';
        const offset = reqOffset ? 'OFFSET ' + reqOffset : '';

        const orderType = (req.query?.orderType && req.query?.orderType !== "undefined") ? req.query.orderType : "";
        const orderBy = (orderType !== "" && req.query?.orderBy !== "undefiend") ? "ORDER BY " + TICKETS_TABLE_NAME + "." + req.query.orderBy : "";

        const query = `SELECT ${TICKETS_TABLE_NAME}.id, ${TICKETS_TABLE_NAME}.short_desc AS shortDesc, ${TICKETS_TABLE_NAME}.description, u1.fullname AS createdBy, ${TICKETS_TABLE_NAME}.created_on AS createdOn, u2.fullname as updatedBy, ${TICKETS_TABLE_NAME}.updated_on AS updatedOn, ${TICKETS_TABLE_NAME}.state, ${TICKETS_TABLE_NAME}.priority, ${TICKETS_TABLE_NAME}.jira_id FROM ${TICKETS_TABLE_NAME} LEFT JOIN ${USERS_TABLE_NAME} u1 ON u1.id=${TICKETS_TABLE_NAME}.user LEFT JOIN ${USERS_TABLE_NAME} u2 ON u2.id=${TICKETS_TABLE_NAME}.updated_by ${orderBy} ${orderType} ${limit} ${offset};`;

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
router.post("/", async (req, res) => {
    if (req?.session?.role) {
        const newTicket = req.body;
        if (newTicket?.shortDesc?.length === 0) {
            res.status(406).send("Short Description field can't be empty!")
        } else if (newTicket?.shortDesc?.length > SHORT_DESC_MAX_LENGTH) {
            res.status(406).send(`Short Description must be less than ${SHORT_DESC_MAX_LENGTH} characters!`);
        } else {
            let jiraID=null;
            await axios.post(`https://${JIRA_DOMAIN_NAME}/rest/api/2/issue`, {
                fields: {
                    summary: newTicket.shortDesc,
                    description: newTicket.description,
                    project: {
                        key:JIRA_PROJECT_KEY
                    },
                    issuetype:{
                        id:10012
                    },
                    priority: {
                        id: getIdByName(JIRA_PRIORITY_MAP, newTicket.priority)
                    }
                }
            }, {
                auth: auth
            }).then(response=>jiraID=response.data.id)
            .catch(err=>console.log(err));

            connection.query(`INSERT INTO ${TICKETS_TABLE_NAME}(short_desc,description,user,created_on,state,priority,jira_id) VALUES (?,?,?,CURRENT_TIMESTAMP(),"New",?,?);`, [newTicket.shortDesc, newTicket.description, req.session.userID, newTicket.priority,jiraID], (err, row) => {
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
router.put("/", async (req, res) => {
    let error = "";
    if (req?.session?.role) {
        const updatedTicket = req.body;
        if (updatedTicket?.shortDesc?.length === 0) {
            res.status(406).send("Short Description field can't be empty!");
        } else if (updatedTicket?.shortDesc?.length > SHORT_DESC_MAX_LENGTH) {
            res.status(406).send(`Short Description must be less than ${SHORT_DESC_MAX_LENGTH} characters!`);
        } else {
            if (updatedTicket.jira_id !== "null" && !isNaN(Number(updatedTicket.jira_id))) {
                await axios.put(`https://${JIRA_DOMAIN_NAME}/rest/api/2/issue/${updatedTicket.jira_id}`, {
                    fields: {
                        summary: updatedTicket.shortDesc,
                        description: updatedTicket.description,
                        priority: {
                            id: getIdByName(JIRA_PRIORITY_MAP, updatedTicket.priority)
                        }
                    }
                }, {
                    auth: auth
                }).catch(err => {
                    if (err.response.status === 400) {
                        console.log(err.response.data);
                        error = "Issue updated failed!";
                    }
                    else if (err.response.status === 403) error = "You don't have permission to update tickets!";
                    else error = "Unexpected error!";
                });
                await axios.post(`https://${JIRA_DOMAIN_NAME}/rest/api/2/issue/${updatedTicket.jira_id}/transitions`,{
                    transition: {
                        id: getIdByName(JIRA_STATUS_MAP, updatedTicket.state)
                    }
                },{
                    auth: auth
                })
                connection.query(`UPDATE ${TICKETS_TABLE_NAME} SET short_desc=?, description=?, updated_by=?, updated_on=CURRENT_TIMESTAMP(), state=?, priority=? WHERE id=?`, [updatedTicket.shortDesc, updatedTicket.description, req.session.userID, updatedTicket.state, updatedTicket.priority, updatedTicket.id], (err, row) => {
                    if (err) error = `There is a problem with connection: ${err.code}`;
                    else if (row.affectedRows === 0) {
                        error = "Ticket doesn't exists!";
                    }
                });
                if (error.length > 0) {
                    res.status(403).send(error)
                } else {
                    res.send("You have successfully updated the ticket!");
                }
            }
        }
    } else res.status(401).send("You have to be logged to edit tickets!");
});
//Delete ticket
router.delete('/', async (req, res) => {
    let error = "";
    if (req?.session?.role === "Admin") {
        if (req.query.jiraID !== "null" && !isNaN(Number(req.query.jiraID))) {
            await axios.delete(`https://${JIRA_DOMAIN_NAME}/rest/api/3/issue/${Number(req.query.jiraID)}`, {
                auth: auth
            })
                .catch(err => {
                    if (err.response.status === 404) error = "Ticket doesn't exists in Jira!";
                    else error = "Problem deleting the ticket in Jira!";
                });
        }
        connection.query(`DELETE FROM ${TICKETS_TABLE_NAME} WHERE id=${req.query.id}`, (err, row) => {
            if (err) error = `There is a problem with connection: ${err.code}`;
            else if (row.affectedRows === 0) {
                error = "Ticket doesn't exists!";
            }
        });
        if (error.length > 0) res.status(401).send(error);
        else res.send("You have successfully deleted the ticket!");
    } else res.status(401).send("You don't have permissions to delete tickets!");
})


module.exports = router;