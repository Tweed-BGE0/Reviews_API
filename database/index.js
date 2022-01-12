const { Pool, Client } = require('pg');

// pools will use environment variables
// for connection information
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test_9',
  password: 'pgadmin',
  port: 5432,
});

pool
  .connect()
  .then(() => {
    console.log('postgres connected :)');
  })
  .catch((err) => {
    console.log('err: ', err);
  });

// get all reviews from database
const getAllReviews = () => {
  return pool.query('SELECT * from characteristics2');
};

module.exports = { getAllReviews };
