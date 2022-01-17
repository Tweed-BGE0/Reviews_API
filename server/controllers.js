const { getReviews, getMeta } = require('./models.js');

const get = (req, res) => {
  getReviews(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      // console.log('>>>>>>?>??>?', data);
      res.send(data);
    }
  });
};

const getMetadata = (req, res) => {
  console.log('>>>>>>', req.query);
  getMeta(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      // console.log('>>>>>>?>??>?', data);
      res.send(data);
    }
  });
};

module.exports = { get, getMeta };
