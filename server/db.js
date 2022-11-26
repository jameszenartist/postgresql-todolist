require("dotenv").config();

// CONFIGURES HOW TO CONNECT TO DB:
const Pool = require("pg").Pool;

let config = {
  user: process.env.POOL_USER,
  password: process.env.POOL_PWD,
  host: process.env.POOL_HOST,
  port: process.env.POOL_PORT,
  database: process.env.PORT_DB,
  ssl: process.env.SSL_AUTH,
};

const pool = new Pool(config);

module.exports = pool;
