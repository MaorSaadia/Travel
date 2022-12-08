import express from 'express';
import {
  addBookingPlace,
  getBookingByid,
  getMyBooking,
  updateBookingToPaid,
} from '../controllers/BookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addBookingPlace);
router.route('/mybooking').get(protect, getMyBooking);
router.route('/:id').get(protect, getBookingByid);
router.route('/:id/pay').put(protect, updateBookingToPaid);

export default router;
