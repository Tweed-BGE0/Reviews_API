var fs = require('fs');
var readline = require('readline');
// const path = require('path');
const { Pool, Client } = require('pg');

const processLineByLine = () => {
  const fileStream = fs.createReadStream(
    '/Users/developer/Desktop/testing/xx_small_xx/characteristic_reviews/characteristic_reviews_test_small.csv'
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
      let query = `INSERT INTO review_characteristic (id, characteristic_id, review_id, value) VALUES (${Number(
        row[0]
      )}, ${Number(row[1])}, ${Number(row[2])}, '${row[3]
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
// characteristic_id INT NOT NULL,
// review_id INT NOT NULL,
// value VARCHAR(1000) NOT NULL,
