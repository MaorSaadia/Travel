import { React, useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import axios from 'axios';

const TravelsScreen = () => {
  const { id } = useParams();
  const [place, setPlace] = useState({});

  useEffect(() => {
    const fetchPlace = async () => {
      const { data } = await axios.get(`/api/places/${id}`);

      setPlace(data);
    };
    fetchPlace();
  });

  //   const dispatch = useDispatch();

  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;

  //   const addProductToCar = () => {
  //     dispatch(addToCart(id, qty));
  //     window.alert('The Product Added To Your Cart');
  //   };

  return (
    <>
      <Link className="btn btn-info my-3" to="/">
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
                    <i className="fa-solid fa-ticket"></i> Buy Ticket
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
