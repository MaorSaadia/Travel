import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  createPlace,
  listDetailsPlace,
  updatePlace,
} from '../actions/placeActions';
import { PLACE_UPDATE_RESET } from '../constants/placeConstants';

const PlaceEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [originCountry, setOriginCountry] = useState('');
  const [numberOfSeat, setNumberOfSeat] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const placeDetails = useSelector((state) => state.placeDetails);
  const { loading, error, place } = placeDetails;

  const placeUpdate = useSelector((state) => state.placeUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = placeUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PLACE_UPDATE_RESET });
      navigate('/admin/placelist');
    } else {
      if (!place.name || place._id !== id) {
        dispatch(listDetailsPlace(id));
      } else {
        setName(place.name);
        setPrice(place.price);
        setImage(place.image);
        setType(place.type);
        setOriginCountry(place.originCountry);
        setNumberOfSeat(place.numberOfSeat);
        setDescription(place.description);
      }
    }
  }, [dispatch, place, id, navigate, successUpdate, createPlace]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePlace({
        _id: id,
        name,
        price,
        image,
        type,
        originCountry,
        description,
        numberOfSeat,
      })
    );
  };

  return (
    <>
      <Link to="/admin/placelist" className="btn btn-info my-3">
        Go Back
      </Link>

      <FormContainer>
        <hr></hr>
        <h1>EDIT PLACE</h1>
        <hr></hr>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
              <FormLabel>Name:</FormLabel>
              <FormControl
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </FormGroup>

            <h5> </h5>
            <FormGroup controlId="price">
              <FormLabel>Price:</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></FormControl>
            </FormGroup>
            <h5> </h5>

            <h5> </h5>
            <FormGroup controlId="image">
              <FormLabel>Image:</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></FormControl>

              <h5> </h5>
              <input
                type="file"
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></input>
              {uploading && <Loader />}
            </FormGroup>
            <h5> </h5>

            <h5> </h5>
            <FormGroup controlId="type">
              <FormLabel>Type:</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              ></FormControl>
            </FormGroup>
            <h5> </h5>

            <h5> </h5>
            <FormGroup controlId="NumberOfSeat">
              <FormLabel>Number Of Seat:</FormLabel>
              <FormControl
                type="number"
                placeholder="Enter Number Of Seat"
                value={numberOfSeat}
                onChange={(e) => setNumberOfSeat(e.target.value)}
              ></FormControl>
            </FormGroup>
            <h5> </h5>

            <h5> </h5>
            <FormGroup controlId="originCountry">
              <FormLabel>Origin Country:</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter Origin Country"
                value={originCountry}
                onChange={(e) => setOriginCountry(e.target.value)}
              ></FormControl>
            </FormGroup>
            <h5> </h5>

            <h5> </h5>
            <FormGroup controlId="description">
              <FormLabel>Description:</FormLabel>
              <FormControl
                as="textarea"
                rows={4}
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></FormControl>
            </FormGroup>
            <h5> </h5>

            <h5> </h5>
            <div className="d-grid gap-3">
              <Button type="submit" variant="primary">
                Update
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default PlaceEditScreen;
