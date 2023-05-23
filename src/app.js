const express = require('express');
const hbs = require('hbs');
const fetchPositions = require('./utils/questrade');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static('public'));

hbs.registerHelper('range', function (count) {
  return Array.from({ length: count }, (_, i) => i + 1);
});

app.get('/', async (req, res) => {
  const token = req.query.token;
  if(!token) {
    return res.send({
        error: 'Token must be provided.'
    })
  }

  try {
    const data = await fetchPositions(token);
    const positions = data.filter(stock => stock.symbol.includes('.TO')).sort((a, b) => a.symbol.localeCompare(b.symbol));
    res.render('index', { positions });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});