const {
  getReviews,
  getMeta,
  addReview,
  reportReview,
  helpfulReview,
} = require('./models.js');

const get = (req, res) => {
  getReviews(req.query, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
};

const getMetadata = (req, res) => {
  getMeta(req.query, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
};

const add = (req, res) => {
  addReview(req.body, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
};

const report = (req, res) => {
  reportReview(req, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
};

const helpful = (req, res) => {
  helpfulReview(req, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(data);
    }
  });
};

module.exports = { get, getMetadata, add, report, helpful };
