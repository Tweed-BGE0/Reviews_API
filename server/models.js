const pool = require('../database/index.js');

const getReviews = (req, callback) => {
  let page = req.page || 1;
  let count = req.count || 5;
  let sort = req.sort || 'relevant';
  let product_id = req.product_id;
  let requestSort = 'date DESC, helpfulness DESC';
  if (sort === 'newest') requestSort = 'date DESC';
  if (sort === 'helpful') requestSort = 'helpfulness DESC';

  let query = `
  SELECT *,
  json_build_object('id', photos.review_id, 'url', photos.url) AS photos
  FROM reviews LEFT JOIN photos ON reviews.id = photos.review_id
  WHERE reviews.product_id=${product_id}
  GROUP BY photos.id, reviews.id
  ORDER BY ${requestSort}
  LIMIT ${count}`;

  pool.query(query, (err, data) => {
    console.log(data);
    if (err) {
      console.log('error', err);
      callback(err, null);
    } else {
      data.rows.forEach((row) => {
        row.photos = row.url ? [{ id: row.id, url: row.url }] : [];
        delete row.url;
        delete row.id;
        delete row.product_id;
      });

      // console.log(data.rows);

      let reviews = {
        product: product_id,
        page: page,
        count: count,
        results: data.rows,
      };
      console.log(reviews);
      callback(null, reviews);
    }
  });
};

// recommended convert to string
// ratings convert to string
// value convert to string
const getMeta = (req, callback) => {
  let product_id = req.query.product_id;
  let query = `
  SELECT
  product_id,
  json_build_object(
    '1', (select count(reviews.rating) from reviews where rating=1 and product_id=${product_id}),
    '2', (select count(reviews.rating) from reviews where rating=2 and product_id=${product_id}),
    '3', (select count(reviews.rating) from reviews where rating=3 and product_id=${product_id}),
    '4', (select count(reviews.rating) from reviews where rating=4 and product_id=${product_id}),
    '5', (select count(reviews.rating) from reviews where rating=5 and product_id=${product_id}))
  AS ratings,
  json_build_object(
    'true', (select count(reviews.recommend) from reviews where reviews.recommend=true and product_id=${product_id}),
    'false', (select count(reviews.recommend) from reviews where reviews.recommend=false and product_id=${product_id}))
  AS recommended,
  json_object_agg(characteristics.name, json_build_object(
    'id', characteristics.id,
    'value', (select avg("value") from review_characteristic where characteristic_id=characteristics.id)))
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
      console.log('>>><><>>DD', data.rows[0]);
      // callback(null, reviews);
    }
  });
};

module.exports = { getReviews, getMeta };
