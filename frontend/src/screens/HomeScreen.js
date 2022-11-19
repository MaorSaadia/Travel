import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Places from '../components/Places';
import axios from 'axios';

const HomeScreen = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const { data } = await axios.get('/api/places');

      setPlaces(data);
    };
    fetchPlaces();
  });

  return (
    <>
      <h1>Hot Places</h1>
      <Row>
        {places.map((place) => (
          <Col key={place._id} sm={12} md={6} lg={4} xl={4}>
            <Places places={place} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
