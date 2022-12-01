import express from 'express';
import {
  createPlace,
  deletePlace,
  getPlaces,
  getPlacesById,
  updatePlace,
} from '../controllers/placeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPlaces).post(protect, admin, createPlace);
router
  .route('/:id')
  .get(getPlacesById)
  .delete(protect, admin, deletePlace)
  .put(protect, admin, updatePlace);

export default router;
