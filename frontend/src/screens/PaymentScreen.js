import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';
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
import Meta from '../components/Meta';
import { listDetailsPlace } from '../actions/placeActions';

const PaymentScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { search } = useLocation();

  const qty = search ? Number(search.split('=')[1]) : 1;

  useEffect(() => {
    dispatch(listDetailsPlace(id));
  }, [dispatch, id]);

  const placeDetails = useSelector((state) => state.placeDetails);
  const { loading, error, place } = placeDetails;

  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { userInfo } = userLogin;

  return (
    <>
      <Meta title={'Travel+ | Payment'} />

      {/* <Link className="btn btn-info my-3" to={`/places/${id}`}>
        Go Back
      </Link> */}

      <hr></hr>
      <h1>PAYMENT SCREEN</h1>
      <hr></hr>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        <Row>
          <Col md={2}>
            <Image src={place.image} alt={place.name} fluid rounded />
          </Col>

          <Row md={7}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{place.name}</h3>
              </ListGroupItem>

              <ListGroupItem>
                <strong>Price For Ticket:</strong> ${place.price}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Origin Country:</strong> {place.originCountry}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Type:</strong> {place.type}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Number Of Ticket's:</strong> {qty}
              </ListGroupItem>
            </ListGroup>
          </Row>
          <Row className="justify-content-md-center">
            <Card
              border="square border border-5 border-dark"
              style={{ width: '25rem' }}
            >
              <Card.Header as="h2">How Much To Pay</Card.Header>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <strong>Total: </strong> ${place.price * qty}
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Row>
        </Row>
      )}
    </>
  );
};

export default PaymentScreen;
