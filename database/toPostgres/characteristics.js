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
    '/Users/developer/Desktop/hack_reactor/bootcamp/SDC/data/characteristics.csv'
  );

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let count = 0;
  let batch = [];
  let query = `INSERT INTO characteristics (id, product_id, name) VALUES `;

  rl.on('line', (line) => {
    let dataArray = line.split(/\r?\n/);
    let row = dataArray.toString().split(',');

    if (count > 0) {
      let values = `(${Number(row[0])}, ${Number(row[1])}, '${row[2]
        .replace(/(^"|"$)/g, '')
        .replace(/'/g, "''")
        .replace(/"/g, "'")}')`;

      batch.push(values);
      if (count === 7) {
        pool.query(query + batch.join(', '), (err, data) => {
          if (err) {
            console.log(err);
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
// product_id INT NOT NULL,
// name VARCHAR(1000) NOT NULL,
// PRIMARY KEY (id)

// remove start and ending quotes.... then replace double quotes with single quotes
// someStr.replace(/(^"|"$)/g, '').replace(/"/g, "'")
