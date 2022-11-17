import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Places from '../components/Places';
import places from '../places';

const HomeScreen = () => {
  return (
    <>
      <h1>Hot Places</h1>
      <Row>
        {places.map((places) => (
          <Col key={places._id} sm={12} md={6} lg={4} xl={4}>
            <Places places={places} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
