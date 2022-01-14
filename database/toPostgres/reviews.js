var fs = require('fs');
var readline = require('readline');
// const path = require('path');
const { Pool, Client } = require('pg');

// pools will use environment variables
// for connection information
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
    '/Users/developer/Desktop/hack_reactor/bootcamp/SDC/data/reviews.csv'
  );

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let count = 0;
  let batch = [];
  let query = `INSERT INTO reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES `;

  rl.on('line', (line) => {
    let dataArray = line.split(/\r?\n/);
    let row = dataArray.toString().split(',');

    if (count > 0) {
      let recommend = row[6] === '0' || row[6] === 'false' ? 'FALSE' : 'TRUE ';
      let reported = row[7] === '0' || row[7] === 'false' ? 'FALSE' : 'TRUE ';
      let response =
        row[10].length === 0 || row[10] === 'null'
          ? 'NULL'
          : `'${row[10]
              .replace(/(^"|"$)/g, '')
              .replace(/'/g, "''")
              .replace(/"/g, "'")}'`;

      let values = `(${Number(row[0])}, ${Number(row[1])}, ${Number(
        row[2]
      )}, '${row[3]
        .replace(/(^"|"$)/g, '')
        .replace(/'/g, "''")
        .replace(/"/g, "'")}', '${row[4]
        .replace(/(^"|"$)/g, '')
        .replace(/'/g, "''")
        .replace(/"/g, "'")}', '${row[5]
        .replace(/(^"|"$)/g, '')
        .replace(/'/g, "''")
        .replace(/"/g, "'")}', ${recommend}, ${reported}, '${row[8]
        .replace(/(^"|"$)/g, '')
        .replace(/'/g, "''")
        .replace(/"/g, "'")}', '${row[9]
        .replace(/(^"|"$)/g, '')
        .replace(/'/g, "''")
        .replace(/"/g, "'")}', ${response}, ${Number(row[11])})`;

      batch.push(values);

      if (count === 999) {
        pool.query(query + batch.join(', '), (err, data) => {
          if (err) {
            console.log('error batch try', err);
          } else {
            // console.log(data);
            console.log('goooooood data');
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
        // console.log('error running last batch', err);
      } else {
        console.log('AGAIN!, GOOD DATA');
      }
    });
  });
};

processLineByLine();

// split -l 10 reviews_photos.csv test
// cat testaa > reviews_photos_test_small.csv

// DROP TABLE reviews CASCADE;
// CREATE TABLE reviews (
// id SERIAL,
// product_id INT NOT NULL,
// rating INT NOT NULL,
// date VARCHAR(1000) NOT NULL,
// summary VARCHAR(1000) NOT NULL,
// body VARCHAR(1000) NOT NULL,
// recommend BOOLEAN,
// reported BOOLEAN NOT NULL,
// reviewer_name VARCHAR(1000),
// reviewer_email VARCHAR(1000),
// response VARCHAR(1000),
// helpfulness INT NOT NULL,
// PRIMARY KEY (id)

// remove start and ending quotes.... then replace double quotes with single quotes
// someStr.replace(/(^"|"$)/g, '').replace(/"/g, "'")

// replace("'", "''", 'g') ----> remove first single quote and add two single quotes
