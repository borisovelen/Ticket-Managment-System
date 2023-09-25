const express = require("express");
const router = express.Router();
const connection = require("../database").dbConnection;
require("dotenv").config();

const TICKETS_TABLE_NAME = process.env.DATABASE_TICKETS_TABLE_NAME;
const transitionsMap = {
    "New":11,
    "In progress":21,
    "Done":31,
    "Review":2
}
const statusMap = {
    10010: "New",
    10011: "In progress",
    10012: "Done",
    10013: "Review"
}
const priorityMap = {
    4: "Low",
    3: "Moderate",
    2: "High",
    1: "Critical"
}

const fetchJira = {
    addIssue: (newIssue) => {
        connection.query(`CALL insertIssue (?,?,?,?,?,?,?);`, [newIssue.id, newIssue.createdOn, newIssue.updatedOn, newIssue.state, newIssue.priority, newIssue.shortDesc, newIssue.description], (err, row) => {
            if (err) console.log(err.code);
            // else console.log(row[0][0]?.msg);
        })
    },
    updateIssue: (newIssue) => {
        connection.query(`CALL updateIssue (?,?,?,?,?,?,?);`, [newIssue.id, newIssue.createdOn, newIssue.updatedOn, newIssue.state, newIssue.priority, newIssue.shortDesc, newIssue.description], (err, row) => {
            if (err) console.log(err.code);
            // else console.log(row[0][0]?.msg);
        })
    },
    deleteIssue: (id) => {
        connection.query(`DELETE FROM ${TICKETS_TABLE_NAME} WHERE jira_id=?`, [id], (err, row) => {
            if (err) console.log(err.code)
            // else console.log(`Successfully deleted jira ticket (NO: ${id}) from database!`);
        })
    }
}


router.post('/', (req, res) => {
    const type = req.body.webhookEvent;
    const issueData = req.body.issue;
    const newIssue = {
        id: issueData.id,
        createdOn: new Date(issueData.fields.created).toISOString().slice(0, 19).replace('T', ' '),
        updatedOn: new Date(issueData.fields.updated).toISOString().slice(0, 19).replace('T', ' '),
        state: statusMap[Number(issueData.fields.status.id)],
        priority: issueData.fields.priority.name,
        shortDesc: issueData.fields.summary,
        description: issueData.fields.description
    }
    if (type === "jira:issue_created") {
        fetchJira.addIssue(newIssue);
    } else if (type === "jira:issue_updated") {
        fetchJira.updateIssue(newIssue);
    } else if (type === "jira:issue_deleted") {
        fetchJira.deleteIssue(newIssue.id);
    }
    res.status(200).send("OK");
});


module.exports.router = router;
module.exports.transitionsMap = transitionsMap;
module.exports.priorityMap = priorityMap;