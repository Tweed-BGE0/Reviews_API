const { getReviews } = require('./models.js');

const get = (req, res) => {
  getReviews((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

module.exports = { get };
