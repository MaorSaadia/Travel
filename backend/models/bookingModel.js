import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    placeName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    numberOfTicket: {
      type: Number,
      required: true,
    },
    originCountry: {
      type: String,
      required: true,
    },
    flightDate: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    placePrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
