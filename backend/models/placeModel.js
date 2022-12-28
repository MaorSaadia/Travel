import mongoose from 'mongoose';

const placeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    originCountry: {
      type: String,
      required: true,
    },
    flightDate: {
      type: String,
      required: true,
    },
    returnDate: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    flightOption: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfSeat: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model('Place', placeSchema);

export default Place;
