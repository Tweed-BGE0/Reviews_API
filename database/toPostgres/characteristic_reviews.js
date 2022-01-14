var fs = require('fs');
var readline = require('readline');
// const path = require('path');
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reviews9',
  password: 'pgadmin',
  port: 5432,
});

pool
  .connect()
  .then(() => {
    console.log('postgres is now connected!!! :)');
  })
  .catch((err) => {
    console.log('err: ', err);
  });

const processLineByLine = () => {
  const fileStream = fs.createReadStream(
    '/Users/developer/Desktop/testing/xx_small_xx/characteristic_reviews/characteristic_reviews_test_small.csv'
  );

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let count = 0;
  let batch = [];
  let query = `INSERT INTO review_characteristic (id, characteristic_id, review_id, value) VALUES `;

  rl.on('line', (line) => {
    let dataArray = line.split(/\r?\n/);
    let row = dataArray.toString().split(',');

    if (count > 0) {
      let values = `(${Number(row[0])}, ${Number(row[1])}, ${Number(
        row[2]
      )}, '${row[3]
        .replace(/(^"|"$)/g, '')
        .replace(/'/g, "''")
        .replace(/"/g, "'")}')`;

      batch.push(values);

      if (count === 7) {
        pool.query(query + batch.join(', '), (err, data) => {
          if (err) {
            console.log(err);
            console.log('error error');
          } else {
            console.log('good data');
          }
        });
        batch = [];
        count = 0;
      }
    }
    count++;
  }).on('close', function (err) {
    console.log('Stream has been destroyed and file has been closed');
    pool.query(query + batch.join(', '), (err, data) => {
      if (err) {
        console.log('error running last batch', err);
      } else {
        console.log('AGAIN!, GOOD DATA');
      }
    });
  });
  console.log('done', count);
};

processLineByLine();

// .replace()

// split -l 10 reviews_photos.csv test
// cat testaa > reviews_photos_test_small.csv

// id SERIAL,
// characteristic_id INT NOT NULL,
// review_id INT NOT NULL,
// value VARCHAR(1000) NOT NULL,

/*
