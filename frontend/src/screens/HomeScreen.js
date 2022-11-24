import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Places from '../components/Places';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listPlaces } from '../actions/placeActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const placeList = useSelector((state) => state.placeList);
  const { loading, error, places } = placeList;

  useEffect(() => {
    dispatch(listPlaces());
  }, [dispatch]);

  return (
    <>
      <h1 className="fancy">Hot Places</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {places.map((place) => (
            <Col key={place._id} sm={12} md={6} lg={4} xl={4}>
              <Places places={place} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
