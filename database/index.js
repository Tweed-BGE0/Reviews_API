const { Pool, Client } = require('pg');
const { parseCharacteristicReviews } = require('./readFiles.js');

// pools will use environment variables
// for connection information
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews2',
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
  console.log(parseCharacteristicReviews());
  // return pool.query('SELECT * from characteristics2');
};

module.exports = { getAllReviews };
