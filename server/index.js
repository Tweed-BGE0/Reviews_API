const express = require('express');
const app = express();
const port = 3000;
const { get } = require('./controllers.js');
// middleware
app.use(express.json());

app.get('/', get);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
