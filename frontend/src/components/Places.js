import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Places = ({ places }) => {
  return (
    <Card className="text-center my-3 p-3 rounded">
      <Card.Header as="h3">
        <strong>{places.name}</strong>
      </Card.Header>
      <Link to={`/places/${places._id}`}>
        <Card.Img src={places.image} variant="top" alt="Card image" />
      </Link>
      <Card.Body>
        <Link to={`/places/${places._id}`}>
          <Card.Title as="div"></Card.Title>
        </Link>
        <Card.Text>
          <strong>Flight Date: </strong>
          {places.flightDate}
          <hr className="hr1"></hr>
          <strong>Return Date: </strong>
          {places.returnDate}
        </Card.Text>
        <Card.Footer as="h3"> ${places.price}</Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default Places;
