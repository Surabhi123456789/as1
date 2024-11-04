const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: 'HOTEL5',
// });

// connection.connect((error) => {
//     if (error) throw error;
//     console.log("Connected to the database!");
// });
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'HOTEL5',
});

module.exports = db;
