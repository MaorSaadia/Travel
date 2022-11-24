import express from 'express';
import { getPlaces, getPlacesById } from '../controllers/placeController.js';
const router = express.Router();

router.route('/').get(getPlaces);

router.route('/:id').get(getPlacesById);

export default router;
