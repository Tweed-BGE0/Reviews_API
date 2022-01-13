var fs = require('fs');
var readline = require('readline');
// const path = require('path');
const { Pool, Client } = require('pg');

// pools will use environment variables
// for connection information
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'reviews2',
//   password: 'pgadmin',
//   port: 5432,
// });

// pool
//   .connect()
//   .then(() => {
//     console.log('postgres is now connected!!! :)');
//   })
//   .catch((err) => {
//     console.log('err: ', err);
//   });

// INSERT INTO reviews (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ()

const parseReviews = () => {
  let directory =
    '/Users/developer/Desktop/hack_reactor/bootcamp/SDC/data_mod/reviews';
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log('err with reading dir!!!', err);
    } else {
      files.forEach((file) => {
        fs.readFile(directory + '/' + file, 'utf8', (err, fileData) => {
          if (err) {
            console.log('error', err);
          } else {
            var dataArray = fileData.split(/\r?\n/);
            let currentArray = dataArray[1].split(',');
            let tempObj = {
              id: currentArray[0],
              product_id: currentArray[1],
              rating: currentArray[2],
              date: currentArray[3],
              summary: currentArray[4],
              body: currentArray[5],
              recommend: currentArray[6],
              reported: currentArray[7],
              reviewer_name: currentArray[8],
              reviewer_email: currentArray[9],
              response: currentArray[10],
              helpfulness: currentArray[11],
            };
            console.log(tempObj);
          }
        });
      });
    }
  });
};

const parseCharacteristics = () => {
  let directory =
    '/Users/developer/Desktop/hack_reactor/bootcamp/SDC/data_mod/characteristics';
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log('err with reading dir!!!', err);
    } else {
      files.forEach((file) => {
        fs.readFile(directory + '/' + file, 'utf8', (err, fileData) => {
          if (err) {
            console.log('error', err);
          } else {
            var dataArray = fileData.split(/\r?\n/);
            let currentArray = dataArray[1].split(',');
            let tempObj = {
              id: currentArray[0],
              product_id: currentArray[1],
              name: currentArray[2],
            };
            console.log(tempObj);
          }
        });
      });
    }
  });
};

const parseReviewsPhotos = () => {
  let directory =
    '/Users/developer/Desktop/hack_reactor/bootcamp/SDC/data_mod/reviews_photos';
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log('err with reading dir!!!', err);
    } else {
      files.forEach((file) => {
        fs.readFile(directory + '/' + file, 'utf8', (err, fileData) => {
          if (err) {
            console.log('error', err);
          } else {
            var dataArray = fileData.split(/\r?\n/);
            let currentArray = dataArray[1].split(',');
            let tempObj = {
              id: currentArray[0],
              review_id: currentArray[1],
              url: currentArray[2],
            };
            console.log(tempObj);
          }
        });
      });
    }
  });
};

const parseCharacteristicReviews = () => {
  let directory =
    '/Users/developer/Desktop/hack_reactor/bootcamp/SDC/data_mod/characteristic_review';
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.log('err with reading dir!!!', err);
    } else {
      files.forEach((file) => {
        fs.readFile(directory + '/' + file, 'utf8', (err, fileData) => {
          if (err) {
            console.log('error', err);
          } else {
            var dataArray = fileData.split(/\r?\n/);
            let currentArray = dataArray[1].split(',');
            let tempObj = {
              id: currentArray[0],
              review_id: currentArray[1],
              characteristic_id: currentArray[2],
              value: currentArray[3],
            };
            console.log(tempObj);
          }
        });
      });
    }
  });
};

module.exports = { parseCharacteristicReviews };
