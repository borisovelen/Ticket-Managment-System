const mysql = require("mysql");
require("dotenv").config();

const mysqlConnection = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME
}

const connection = mysql.createConnection(mysqlConnection)
connection.connect((err)=>{
    if(err) console.log(`Database connection failed: ${err}`);
    else console.log(`Database connection successful!`);
});

exports.dbConnection = connection;