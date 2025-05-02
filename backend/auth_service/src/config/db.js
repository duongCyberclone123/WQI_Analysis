const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "ballast.proxy.rlwy.net",
  user: "root",
  password: "IKSzaRZEQpcOoUNdzTVgHzibDYptqDip",
  database: "railway",
  port: 50205
});

module.exports = pool;
