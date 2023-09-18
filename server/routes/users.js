const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../database").dbConnection;
require("dotenv").config();

const usersTable = process.env.DATABASE_USERS_TABLE_NAME;

//Login and register logics
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
const EMAIL_PATTERN = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const NAME_PATTERN = /[a-zA-Z'-]+/;

function validatePassword(pass) {
    return PASSWORD_PATTERN.test(pass);
}
function validateEmail(email) {
    return EMAIL_PATTERN.test(email);
}
function validateName(name) {
    return NAME_PATTERN.test(name);
}

//Check if user is logged in
router.post("/profile", (req, res) => {
    if (req.session.fullname) {
        res.send({ msg: `Hello, ${req.session.fullname}`, status: req.session.logged, fullname: req.session.fullname, email: req.session.email, role: req.session.role, joined_on:req.session.joined_on });
    } else res.send({ msg: `You are not logged in!`, status: false });
})
//Logout
router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send("Successfull logout!");
        }
    });
})
//Check if user credentials are correct 
router.post("/login", async (req, res) => {
    if (req.session.email) {
        res.send(403).send("You are already logged in!");
    } else {
        let newLogin = req.body;
        if (newLogin.email === '' || newLogin.password === '') {
            res.status(401).send("Email or password can't be empty!");
        } else if (!validateEmail(newLogin.email)) {
            res.status(401).send("This is invalid email!");
        } else if (!validatePassword(newLogin.password)) {
            res.status(401).send("This is invalid password!");
        } else {
            connection.query(`SELECT ${usersTable}.id, ${usersTable}.fullname, ${usersTable}.email, ${usersTable}.joined_on,${usersTable}.role, ${usersTable}.pass FROM ${usersTable} WHERE email="${newLogin.email}";`, async (err, row) => {
                if (err) res.status(500).send(`There is a problem with connection: ${err.code}`);
                else if (row.length == 0) {
                    res.status(401).send("There is no such user with this email!");
                } else {
                    try {
                        const hashedPassword = row[0].pass;
                        const passMatch = await bcrypt.compare(newLogin.password, hashedPassword);
                        if (passMatch) {
                            req.session.userID = row[0].id;
                            req.session.fullname = row[0].fullname;
                            req.session.role = row[0].role;
                            req.session.joined_on = row[0].joined_on;
                            req.session.email = row[0].email;
                            req.session.logged = true;
                            res.send(`Successfull login!`);
                        } else res.status(401).send("Incorrect password!");
                    } catch (error) {
                        res.status(500).send("An unexpected error!");
                    }
                }
            })
        }
    }

});
//Delete user
router.delete("/profile", async (req, res) => {
    const newLogin = req.body;
    if (req.session.role) {
        if (!validatePassword(newLogin.password)) {
            res.status(401).send("This is invalid password!");
        } else {
            try {
                connection.query(`SELECT ${usersTable}.pass FROM ${usersTable} WHERE id=${req.session.userID}`, async (err, result) => {
                    const passMatch = await bcrypt.compare(newLogin.password, result[0].pass);
                    if (err) res.status(500).send(`There is a problem with connection: ${err.code}`);
                    else if (passMatch) {
                        connection.query(`DELETE FROM ${usersTable} WHERE id=${req.session.userID};`, (err, row) => {
                            if (err) res.status(500).send(`There is a problem with connection: ${err.code}`);
                            else if (row.affectedRows > 0) {
                                req.session.destroy(err => {
                                    if (err) {
                                        console.error(err);
                                    } else {
                                        res.send("You have successfully deleted your account!");
                                    }
                                });
                            } else res.status(401).send("Delete unsuccessful!");
                        })
                    } else res.status(401).send("Incorrect password!");
                });
            } catch (err) {
                res.status(500).send("An unexpected error!");
            }
        }
    } else res.status(403).send("You are not logged in!");
});
//Register new user
router.post("/register", async (req, res) => {
    let newUser = req.body;
    if (req.session.role) {
        res.status(401).send("You are logged in!");
    } else {
        if (newUser.fname === '' || newUser.lname === '' || newUser.email === '' || newUser.password === '') {
            res.status(401).send("All fields are required!");
        } else if (!validateName(newUser.fname)) {
            res.status(401).send("The First Name is invalid!");
        } else if (!validateName(newUser.lname)) {
            res.status(401).send("The Last Name is invalid!");
        } else if (!validateEmail(newUser.email)) {
            res.status(401).send("This is invalid email!");
        } else if (!validatePassword(newUser.password)) {
            res.status(401).send("This is invalid password!");
        } else if (newUser.fname.length === 0) {
            res.status(401).send("This is invalid password!");
        } else {
            try {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hashedPassword = await bcrypt.hash(newUser.password, salt);
                connection.query(`INSERT INTO ${usersTable} (fname,lname,fullname,email,pass,joined_on) VALUES (?,?,?,?,?,CURRENT_TIMESTAMP());`, [newUser.fname, newUser.lname, newUser.fname + " " + newUser.lname, newUser.email, hashedPassword], (err) => {
                    if (err) {
                        if (err.code === "ER_DUP_ENTRY") res.status(401).send(`Unsuccessful register: This email is already registered!`);
                        else res.status(500).send("An unexpected error!");
                    } else res.send(`Successfull registration, "${newUser.fname+" "+newUser.lname}"`);
                });
            } catch (err) {
                res.status(500).send("An unexpected error!");
            }
        }
    }

});

//Edit account


module.exports = router;