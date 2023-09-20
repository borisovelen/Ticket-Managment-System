const express = require("express");
const router = express.Router();
const connection = require("../database").dbConnection;
require("dotenv").config();

const TICKETS_TABLE_NAME = process.env.DATABASE_TICKETS_TABLE_NAME;
const statusMap = new Map([
    [10010, "New"],
    [10011, "In Progress"],
    [10012, "Done"],
    [10013, "Review"]
]);


function addIssue(newIssue) {
    const callInsertQuery = `CALL insertIssue (?,?,?,?,?,?);`;
    connection.query(callInsertQuery, [newIssue.id, newIssue.createdOn, newIssue.updatedOn, newIssue.state, newIssue.shortDesc, newIssue.description], (err, row) => {
        if (err) console.log(err);
        else console.log(row[0][0]?.msg);
    })
}
function updateIssue(newIssue) {
    const callUpdateQuery = `CALL updateIssue (?,?,?,?,?,?);`;
    connection.query(callUpdateQuery, [newIssue.id, newIssue.createdOn, newIssue.updatedOn, newIssue.state, newIssue.shortDesc, newIssue.description], (err, row) => {
        if (err) console.log(err);
        else console.log(row[0][0]?.msg);
    })
}
function deleteIssue(id) {
    const deleteQuery = `DELETE FROM ${TICKETS_TABLE_NAME} WHERE jira_id=?`;
    connection.query(deleteQuery, [id], (err, row) => {
        if (err) console.log(err)
        else console.log(`Successfully deleted jira ticket (NO: ${id}) from database!`);
    })
}

router.post('/', (req, res) => {
    const type = req.body.webhookEvent;
    const issueData = req.body.issue;
    const newIssue = {
        id: issueData.id,
        createdOn: new Date(issueData.fields.created).toISOString().slice(0, 19).replace('T', ' '),
        updatedOn: new Date(issueData.fields.updated).toISOString().slice(0, 19).replace('T', ' '),
        state: statusMap.get(Number(issueData.fields.status.id)),
        shortDesc: issueData.fields.summary,
        description: issueData.fields?.description
    }
    if (type === "jira:issue_created") {
        addIssue(newIssue);
    } else if (type === "jira:issue_updated") {
        updateIssue(newIssue);
    } else if (type === "jira:issue_deleted") {
        deleteIssue(newIssue.id);
    }
    res.status(200).send("OK");
});

module.exports = router;