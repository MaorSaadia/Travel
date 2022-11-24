import asyncHandler from 'express-async-handler';
import Place from '../models/placeModel.js';

// @desc Fetch all Place
// @route GET /api/place
// @access Public
const getPlaces = asyncHandler(async (req, res) => {
  const places = await Place.find({});
  res.json(places);
});

// @desc Fetch single Place
// @route GET /api/place/:id
// @access Public
const getPlacesById = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (place) {
    res.json(place);
  } else {
    res.status(404);
    throw new Error('Place Not Found');
  }
});

export { getPlaces, getPlacesById };
