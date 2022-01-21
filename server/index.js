const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { get, getMetadata, add, report, helpful } = require('./controllers.js');
// middleware
app.use(express.json());

app.get('/reviews', get);
app.get('/reviews/meta', getMetadata);
app.post('/reviews', add);
app.put('/reviews/:review_id/helpful', helpful);
app.put('/reviews/:review_id/report', report);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
