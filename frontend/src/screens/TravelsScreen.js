import React from 'react';
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import places from '../places';

const TravelsScreen = () => {
  const { id } = useParams();
  const place = places.find((p) => p._id === id);
  let navigate = useNavigate();

  //   const dispatch = useDispatch();

  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;

  //   const addProductToCar = () => {
  //     dispatch(addToCart(id, qty));
  //     window.alert('The Product Added To Your Cart');
  //   };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>

      <Row>
        <Col md={5}>
          <Image src={place.image} alt={place.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{place.name}</h3>
            </ListGroupItem>

            <ListGroupItem>
              <strong>Price:</strong> ${place.price}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Description:</strong> {place.description}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${place.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>{place.seatLeft > 0 ? 'Availbale' : 'Out of Stock'}</Col>
                </Row>
              </ListGroupItem>

              {/* {places.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <Form.Control
                        size="sm"
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(places.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )} */}

              <ListGroupItem>
                <div className="d-grid gap-2">
                  <Button
                    // onClick={addplaceToCar}
                    variant="outline-info"
                    disabled={place.seatLeft === 0}
                  >
                    Add To Cart
                  </Button>
                </div>
              </ListGroupItem>

              <ListGroupItem>
                <div className="d-grid gap-2">
                  <Button
                    // onClick={addToCartHandler}
                    variant="outline-info"
                    disabled={place.countInStock === 0}
                  >
                    Go To Cart
                  </Button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TravelsScreen;
