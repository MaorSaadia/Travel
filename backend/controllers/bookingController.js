import asyncHandler from 'express-async-handler';
import Booking from '../models/bookingModel.js';

// @desc Create new booking
// @route POST /api/orders
// @access private
const addBookingPlace = asyncHandler(async (req, res) => {
  const {
    numberOfTicket,
    placeName,
    image,
    originCountry,
    flightDate,
    type,
    paymentMethod,
    placePrice,
    totalPrice,
  } = req.body;

  if (numberOfTicket && numberOfTicket.length === 0) {
    res.status(400);
    throw new Error('No Booking Places');
    return;
  } else {
    const order = new Booking({
      user: req.user._id,
      placeName,
      image,
      originCountry,
      flightDate,
      type,
      placePrice,
      totalPrice,
      paymentMethod,
      numberOfTicket,
    });

    const bookingOrder = await order.save();

    res.status(201).json(bookingOrder);
  }
});

// @desc Get booking by ID
// @route GET /api/orders/:id
// @access private
const getBookingByid = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (booking) {
    res.json(booking);
  } else {
    res.status(404);
    throw new Error('Booking Order Not Found');
  }
});

// @desc Update order to paid
// @route PUT /api/payment/:id/pay
// @access private
const updateBookingToPaid = asyncHandler(async (req, res) => {
  const order = await Booking.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedBooking = await order.save();

    res.json(updatedBooking);
  } else {
    res.status(404);
    throw new Error('Booking Not Found');
  }
});

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

export { addBookingPlace, getBookingByid, updateBookingToPaid };
