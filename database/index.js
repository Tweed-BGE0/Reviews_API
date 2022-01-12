const { Pool, Client } = require('pg');

// pools will use environment variables
// for connection information
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_2',
  password: 'pgadmin',
  port: 5432,
});

// get all reviews from database
const getAllReviews = () => {
  return pool.query('SELECT * from test_table_1');
};

module.exports = { pool, getAllReviews };
