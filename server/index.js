const express = require('express');
const app = express();
const port = 3000;
const { get, getMeta } = require('./controllers.js');
// middleware
app.use(express.json());

app.get('/reviews', get);

app.get('/reviews/meta', getMeta);

app.post('/reviews', (req, res) => {
  console.log('posting reviews');
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  console.log('helpful');
});

app.put('/reviews/:review_id/report', (req, res) => {
  console.log('reporting');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
