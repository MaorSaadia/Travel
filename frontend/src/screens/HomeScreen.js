import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Places from '../components/Places';
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
      <h1>Hot Places</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
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
