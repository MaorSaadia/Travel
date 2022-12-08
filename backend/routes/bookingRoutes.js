import express from 'express';
import {
  addBookingPlace,
  getBookingByid,
  updateBookingToPaid,
} from '../controllers/BookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addBookingPlace);
// router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getBookingByid);
router.route('/:id/pay').put(protect, updateBookingToPaid);
// router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
