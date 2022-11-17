import React from 'react';
import { Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

const Places = ({ places }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/places/${places._id}`}>
        <Card.Img src={places.image} variant="top" />
      </a>

      <Card.Body>
        <a href={`/places/${places._id}`}>
          <Card.Title as="div">
            <strong>{places.name}</strong>
          </Card.Title>
        </a>

        {/* <Card.Text as="div">
          value={places.rating}
          text={`  ${places.numReviews} reviews`}
        </Card.Text> */}

        <Card.Text as="h3">${places.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Places;
