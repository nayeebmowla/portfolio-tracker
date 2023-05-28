const express = require('express');
const fetchPositions = require('./utils/questrade');
const transformData = require('./utils/transform-data');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/positions', async (req, res) => {
  const token = req.query.token;
  if(!token) {
    return res.send({
        error: 'Token must be provided.'
    })
  }

  try {
    const positions = await fetchPositions(token);
    const formatted = await transformData(positions);
    res.json(formatted);
  } catch (e) {
    console.log(e);
    res.status(400).json("Token may be expired, please try with a new token.\nError: " + e);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});