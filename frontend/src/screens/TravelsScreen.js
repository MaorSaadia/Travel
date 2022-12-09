import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listDetailsPlace } from '../actions/placeActions';
// import { createOrder } from '../actions/bookingActions';

const TravelsScreen = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listDetailsPlace(id));
  }, [dispatch, id]);

  const placeDetails = useSelector((state) => state.placeDetails);
  const { loading, error, place } = placeDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const goToPayment = () => {
    if (!userInfo) {
      window.confirm('You Must Sign In First To Book Place');
    } else {
      navigate(`/payment/${id}?qty=${qty}`);
    }
  };

  return (
    <>
      <Link className="btn btn-info my-3" to="/">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
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
                <strong>Origin Country:</strong> {place.originCountry}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Type:</strong> {place.type}
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
                    <Col>
                      {place.numberOfSeat > 0 ? 'Availbale' : 'Sold Out'}
                    </Col>
                  </Row>
                </ListGroupItem>

                {place.numberOfSeat > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>How Many Ticket:</Col>
                      <Col>
                        <Form.Control
                          size="sm"
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(6).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem>
                  <div className="d-grid gap-2">
                    <Button
                      onClick={goToPayment}
                      variant="outline-info"
                      disabled={place.numberOfSeat === 0}
                    >
                      Continue To Payment
                    </Button>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default TravelsScreen;
