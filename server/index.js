const express = require('express')
const app = express()
const port = 3000
const pool = require('../database/index.js');

//middleware
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const allData = await pool.query('SELECT * from test_table_1');
    console.log(allData)
    res.send(allData.rows)
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})