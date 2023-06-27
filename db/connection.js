const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '987651P!',
        database: 'employee_db'
    },
    console.log('Connected to the MySQL server.')
);

module.exports = db;
