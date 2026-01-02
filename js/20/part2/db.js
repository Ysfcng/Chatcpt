const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "chatcptdb",
  password: "",
  port: 5432
});

module.exports = pool;
