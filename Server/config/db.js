const mysql = require("mysql2");
require("dotenv").config();

console.log("Host:", process.env.DB_HOST);
console.log("Port:", process.env.DB_PORT);
console.log("User:", process.env.DB_USER);
console.log("Database:", process.env.DB_NAME);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  connectTimeout: 30000,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database Connection Failed");
    console.error(err);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

module.exports = db;