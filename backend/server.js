import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import { NotFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './data/config/db.js';

import placeRoutes from './routes/placeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/places', placeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', bookingRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(NotFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server runnig in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
