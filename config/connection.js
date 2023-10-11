var Pool = require('pg').Pool;

var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'moviesdatabase2',
  password: 'mukti',
  port: 5432,
});

module.exports = pool