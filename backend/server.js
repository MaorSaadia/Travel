const express = require('express');
const places = require('./data/places');

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/places', (req, res) => {
  res.json(places);
});

app.get('/api/places/:id', (req, res) => {
  const place = places.find((p) => p._id === req.params.id);
  res.json(place);
});

app.listen(5000, console.log('Server runnig on port 5000'));
