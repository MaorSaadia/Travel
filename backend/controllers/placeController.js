import asyncHandler from 'express-async-handler';
import Place from '../models/placeModel.js';

// @desc Fetch all Place
// @route GET /api/place
// @access Public
const getPlaces = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const places = await Place.find({ ...keyword });
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

// @desc Delete a place
// @route DELETE /api/places/:id
// @access Private/Admin
const deletePlace = asyncHandler(async (req, res) => {
  const place = await Place.findById(req.params.id);

  if (place) {
    await place.remove();
    res.json({ message: 'Place Removed' });
  } else {
    res.status(404);
    throw new Error('Proudct Not Found');
  }
});

// @desc Create a place
// @route POST /api/places
// @access Private/Admin
const createPlace = asyncHandler(async (req, res) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formattedToday = dd + '/' + mm + '/' + yyyy;

  const place = new Place({
    name: 'name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    flightOption: 'Direct Flight',
    originCountry: 'originCountry',
    numberOfSeat: 0,
    description: 'description',
    flightDate: formattedToday,
  });

  const createdPlace = await place.save();
  res.status(201).json(createdPlace);
});

// @desc Update a place
// @route PUT /api/places/:id
// @access Private/Admin
const updatePlace = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    flightOption,
    originCountry,
    numberOfSeat,
    flightDate,
  } = req.body;

  const place = await Place.findById(req.params.id);

  if (place) {
    place.name = name;
    place.price = price;
    place.description = description;
    place.image = image;
    place.flightOption = flightOption;
    place.originCountry = originCountry;
    place.numberOfSeat = numberOfSeat;
    place.flightDate = flightDate;

    const updatedPlace = await place.save();
    res.json(updatedPlace);
  } else {
    res.status(404);
    throw new Error('Place Not Found');
  }
});

export { getPlaces, getPlacesById, deletePlace, createPlace, updatePlace };
