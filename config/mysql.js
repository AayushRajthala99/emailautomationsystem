const mysql = require("mysql");
const path = require("path");
const config = require(path.join(__dirname, "default.json"));
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || config.mysql.host,
  user: process.env.DB_USERNAME || config.mysql.user,
  password: process.env.DB_PASSWORD || config.mysql.password,
  database: process.env.DB_DATABASE || config.mysql.database,
  port: process.env.DB_PORT || config.mysql.port,
});

connection.connect();
module.exports = connection;
