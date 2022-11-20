import express from 'express';
import dotenv from 'dotenv';
import places from './data/places.js';

dotenv.config();

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

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server runnig in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
