const { getAllReviews } = require('../database/index.js');

const getReviews = (callback) => {
  getAllReviews()
    .then((result) => callback(null, result.rows))
    .catch((err) => callback(err, null));
};

module.exports = { getReviews };
