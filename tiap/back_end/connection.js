const mysql = require('mysql-await')

const connection = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    throwErrors: false,
    port: process.env.MYSQL_PORT || 3306
});

connection.on(`error`, (err) => {
    console.error(`Connection error ${err.code}`);
});

module.exports = connection
