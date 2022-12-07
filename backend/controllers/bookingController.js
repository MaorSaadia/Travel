import asyncHandler from 'express-async-handler';
import Booking from '../models/bookingModel.js';

// @desc Create new booking
// @route POST /api/bookings
// @access private
const addBookingPlace = asyncHandler(async (req, res) => {
  const { orderTicket, paymentMethod, placePrice, totalPrice } = req.body;

  if (orderTicket && orderTicket.length === 0) {
    res.status(400);
    throw new Error('No Booking Places');
  } else {
    const orderTicket = new Booking({
      orderTicket,
      user: req.user._id,
      paymentMethod,
      placePrice,
      totalPrice,
    });

    const bookingOrder = await order.save();

    res.status(201).json(bookingOrder);
  }
});

// @desc Get booking by ID
// @route GET /api/booking/:id
// @access private
const getBookingByid = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (booking) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Booking Order Not Found');
  }
});

// // @desc Update order to paid
// // @route PUT /api/orders/:id/pay
// // @access private
// const updateOrderToPaid = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   if (order) {
//     order.isPaid = true;
//     order.paidAt = Date.now();
//     order.paymentResult = {
//       id: req.body.id,
//       status: req.body.status,
//       update_time: req.body.update_time,
//       email_address: req.body.payer.email_address,
//     };

//     const updatedOrder = await order.save();

//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error('Order not found');
//   }
// });

// // @desc Update order to delivered
// // @route PUT /api/orders/:id/deliver
// // @access private/Admin
// const updateOrderToDelivered = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);

//   if (order) {
//     order.isDeliverd = true;
//     order.deliverdAt = Date.now();

//     const updatedOrder = await order.save();

//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error('Order not found');
//   }
// });

// // @desc Get logged in user order
// // @route GET /api/orders/myorders
// // @access private
// const getMyOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({ user: req.user._id });

//   res.json(orders);
// });

// // @desc Get all orders
// // @route GET /api/orders
// // @access private/Admin
// const getOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({}).populate('user', 'id name');

//   res.json(orders);
// });

export { addBookingPlace, getBookingByid };