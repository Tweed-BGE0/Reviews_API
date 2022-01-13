var fs = require('fs');
var readline = require('readline');
// const path = require('path');
const { Pool, Client } = require('pg');

const processLineByLine = () => {
  const fileStream = fs.createReadStream(
    '/Users/developer/Desktop/testing/xx_small_xx/photos/reviews_photos_test_small.csv'
  );

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let count = 0;
  rl.on('line', (line) => {
    let dataArray = line.split(/\r?\n/);
    let row = dataArray.toString().split(',');
    if (count > 0) {
      let query = `INSERT INTO photos (id, review_id, url) VALUES (${Number(
        row[0]
      )}, ${Number(row[1])}, '${row[2]
        .replace(/(^"|"$)/g, '')
        .replace(/"/g, "'")}')`;
      console.log(query);
    }
    count++;
  });
};

processLineByLine();

// .replace()

// split -l 10 reviews_photos.csv test
// cat testaa > reviews_photos_test_small.csv

// id SERIAL,
// review_id INT NOT NULL,
// url VARCHAR(1000) NOT NULL,
// PRIMARY KEY (id)
