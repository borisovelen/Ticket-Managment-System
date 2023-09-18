const express = require("express");
const router = express.Router();
const connection = require("../database").dbConnection;
require("dotenv").config();

const ticketsTable = process.env.DATABASE_TICKETS_TABLE_NAME;
const usersTable = process.env.DATABASE_USERS_TABLE_NAME;
const SHORT_DESC_MAX_LENGTH = 100;

//Tickets logics
//Get All tickets
router.get("/", (req, res) => {
    if (req?.session?.role) {
        const reqOffset = Number(req.query.offset) >= 0 ? Number(req.query.offset) : false;
        const reqLimit = Number(req.query.limit) > 0 ? Number(req.query.limit) : false;
        const isUser = req.session.role === "Admin";

        const limit = reqLimit ?  'LIMIT ' + reqLimit : '';
        const offset = reqOffset ? 'OFFSET ' + reqOffset : '';
        const adminCheck = (!isUser ? '' : `WHERE ${ticketsTable}.user=${req?.session?.userID}`);
        
        const orderType = (req.query?.orderType&&req.query?.orderType!=="undefined")?req.query.orderType:"";
        const orderBy = (orderType!==""&&req.query?.orderBy!=="undefiend")?"ORDER BY "+ticketsTable+"."+req.query.orderBy:"";

        const query = `SELECT ${ticketsTable}.id, ${ticketsTable}.short_desc AS shortDesc, ${ticketsTable}.description, u1.fullname AS createdBy, ${ticketsTable}.created_on AS createdOn, u2.fullname as updatedBy, ${ticketsTable}.updated_on AS updatedOn, ${ticketsTable}.state, ${ticketsTable}.priority FROM ${ticketsTable} JOIN ${usersTable} u1 ON u1.id=${ticketsTable}.user LEFT JOIN ${usersTable} u2 ON u2.id=${ticketsTable}.updated_by ${adminCheck} ${orderBy} ${orderType} ${limit} ${offset};`;

        connection.query(query, (err, row) => {
            if (err){
                console.log(err);
                res.status(500).send(`There is a problem with connection: ${err.code}`);
            } 
            else if (row.length === 0) {
                if (isUser) {
                    res.send("You don't have any tickets!")
                } else res.send("There are no tickets!");;
            } else res.send(row);
        });
    } else {
        res.send("You have to be logged in to see the tickets!");
    }
})
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
            connection.query(`INSERT INTO ${ticketsTable}(short_desc,description,user,created_on,state,priority) VALUES (?,?,?,CURRENT_TIMESTAMP(),"New",?);`, [newTicket.shortDesc, newTicket.description, req.session.userID, newTicket.priority], (err, row) => {
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
                connection.query(`UPDATE ${ticketsTable} SET short_desc=?, description=?, updated_by=?, updated_on=CURRENT_TIMESTAMP(), state=?, priority=? WHERE id=? ${req?.session?.role === "Admin" ? '' : `AND user=${req.session.userID}`}`, [updatedTicket.shortDesc, updatedTicket.description, req.session.userID, updatedTicket.state, updatedTicket.priority, updatedTicket.id], (err, row) => {
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
        connection.query(`DELETE FROM ${ticketsTable} WHERE id=${req.params.id} ${req?.session?.role === "Admin" ? `` : `AND user=${req?.session?.userID}`}`, (err, row) => {
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