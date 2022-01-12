const { Pool, Client } = require('pg');

// pools will use environment variables
// for connection information
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_2',
  password: 'pgadmin',
  port: 5432
});

module.exports = pool;