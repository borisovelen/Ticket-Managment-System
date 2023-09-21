const express = require("express");
require("dotenv").config();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const MySQLStore = require('express-mysql-session')(session);
const connection = require("./database").dbConnection;

const usersRouter = require("./routes/users");
const jiraRouter = require("./routes/jira").router;
const ticketsRouter = require("./routes/tickets");


const PORT = process.env.SERVER_PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const sessionStore = new MySQLStore({ clearExpired: true, checkExpirationInterval: 50000 }, connection);
app.use(session({
    secret: process.env.SECRET_TOKEN,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    }
}));

app.use("/", usersRouter);
app.use("/tickets", ticketsRouter);
app.use("/jiraIssueChange", jiraRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));