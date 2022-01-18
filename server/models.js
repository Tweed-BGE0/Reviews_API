const pool = require('../database/index.js');

const getReviews = (req, callback) => {
  let page = req.page || 1;
  let count = req.count || 5;
  let sort = req.sort || 'relevant';
  let product_id = req.product_id;
  let requestSort = 'helpfulness DESC, date DESC';
  if (sort === 'newest') requestSort = 'date DESC';
  if (sort === 'helpful') requestSort = 'helpfulness DESC';

  let query = `
  SELECT DISTINCT reviews.rating, reviews.date, reviews.summary, reviews.body, reviews.recommend, reviews.reported, reviews.reviewer_name, reviews.reviewer_email, reviews.response, reviews.helpfulness, photos.review_id,
  (SELECT jsonb_agg(photo) FROM (SELECT id, url FROM photos WHERE review_id = reviews.id) photo) AS photos
  FROM reviews LEFT JOIN photos ON reviews.id = photos.review_id
  WHERE reviews.product_id=${product_id}
  GROUP BY photos.id, reviews.id
  ORDER BY ${requestSort}
  LIMIT ${count}`;

  pool.query(query, (err, data) => {
    if (err) {
      console.log('error', err);
      callback(err, null);
    } else {
      let reviews = {
        product: product_id,
        page: page,
        count: count,
        results: data.rows,
      };
      callback(null, reviews);
    }
  });
};

const getMeta = (req, callback) => {
  let product_id = req.product_id;
  let query = `
  SELECT
  product_id,
  json_build_object(
    '1', (SELECT COUNT(reviews.rating) FROM reviews WHERE rating=1 and product_id=${product_id}),
    '2', (SELECT COUNT(reviews.rating) FROM reviews WHERE rating=2 and product_id=${product_id}),
    '3', (SELECT COUNT(reviews.rating) FROM reviews WHERE rating=3 and product_id=${product_id}),
    '4', (SELECT COUNT(reviews.rating) FROM reviews WHERE rating=4 and product_id=${product_id}),
    '5', (SELECT COUNT(reviews.rating) FROM reviews WHERE rating=5 and product_id=${product_id}))
  AS ratings,
  json_build_object(
    'true', (SELECT COUNT(reviews.recommend) FROM reviews WHERE reviews.recommend=true and product_id=${product_id}),
    'false', (SELECT COUNT(reviews.recommend) FROM reviews WHERE reviews.recommend=false and product_id=${product_id}))
  AS recommended,
  json_object_agg(characteristics.name, json_build_object(
    'id', characteristics.id,
    'value', (SELECT avg("value") FROM review_characteristic WHERE characteristic_id=characteristics.id)))
  AS characteristics
  FROM
  characteristics
  WHERE
  product_id=${product_id}
GROUP BY
  product_id
;`;

  pool.query(query, (err, data) => {
    if (err) {
      console.log('error', err);
      callback(err, null);
    } else {
      for (let bool in data.rows[0].recommended) {
        data.rows[0].recommended[bool] =
          data.rows[0].recommended[bool].toString();
      }
      for (let rating in data.rows[0].ratings) {
        data.rows[0].ratings[rating] = data.rows[0].ratings[rating].toString();
      }
      for (let characteristic in data.rows[0].characteristics) {
        let char = data.rows[0].characteristics[characteristic];
        char.value = char.value.toString();
      }
      data.rows[0].product_id = data.rows[0].product_id.toString();
      let reviews = data.rows[0];

      callback(null, reviews);
    }
  });
};

const addReview = (req, callback) => {
  let today = new Date();
  today = today.toISOString();

  let photos = req.photos;
  let photosBatch = [];
  let photosInsert = `INSERT INTO photos (review_id, url) VALUES `;

  photos.forEach((photo) => {
    let values = `((select id from insert1), '${photo
      .replace(/(^"|"$)/g, '')
      .replace(/'/g, "''")
      .replace(/"/g, "'")}')`;
    photosBatch.push(values);
  });

  let photosQuery = photosInsert + photosBatch.join(', ');
  const { product_id, rating, summary, body, recommend, name, email } = req;

  let reviewsInsert = `INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES `;
  let reviewValues = `(${product_id}, ${rating}, '${today}', '${summary}', '${body}', ${recommend}, false, '${name}', '${email}', '', 0)`;

  let reviewsQuery = reviewsInsert + reviewValues;
  let characteristicBatch = [];
  let characteristicInsert = `INSERT INTO review_characteristic (characteristic_id, review_id, value) VALUES `;

  let entries = Object.entries(req.characteristics);

  entries.forEach((entry) => {
    let values = `(${Number(entry[0])}, (select id from insert1), ${entry[1]})`;
    characteristicBatch.push(values);
  });

  let characteristicsQuery =
    characteristicInsert + characteristicBatch.join(', ');

  let query = `
  WITH insert1 AS (
  ${reviewsQuery}
  RETURNING id
  ),
  insert2 AS (
  ${characteristicsQuery}
  RETURNING review_id
  )
  ${photosQuery}
  `;

  pool.query(query, (err, data) => {
    if (err) {
      console.log('error', err);
      callback(err, null);
    } else {
      callback(null, 'successs!');
    }
  });
};

const reportReview = (req, callback) => {
  let reviewId = Number(req.params.review_id);
  let query = `
UPDATE reviews
SET reported = true
WHERE reviews.id = ${reviewId}
`;

  pool.query(query, (err, data) => {
    if (err) {
      console.log('error', err);
      callback(err, null);
    } else {
      callback(null, 'successs!');
    }
  });
};

const helpfulReview = (req, callback) => {
  let reviewId = Number(req.params.review_id);
  let query = `
UPDATE reviews
SET helpfulness = helpfulness + 1
WHERE reviews.id = ${reviewId}
`;

  pool.query(query, (err, data) => {
    if (err) {
      console.log('error', err);
      callback(err, null);
    } else {
      callback(null, 'successs!');
    }
  });
};

module.exports = {
  getReviews,
  getMeta,
  addReview,
  reportReview,
  helpfulReview,
};
