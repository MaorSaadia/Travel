import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  ListGroupItem,
} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { payOrder } from '../actions/bookingActions';
import { listDetailsPlace } from '../actions/placeActions';
import { createOrder } from '../actions/bookingActions';
import { updatePlace } from '../actions/placeActions';
import { BOOKING_PAY_RESET } from '../constants/bookingConstants';
import FormContainer from '../components/FormContainer';

const PaymentScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { search } = useLocation();

  const [sdkReady, setSdkReady] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const qty = search ? Number(search.split('=')[1]) : 1;

  const bookingDetails = useSelector((state) => state.bookingDetails);
  const { order, loadingBooking, errorBooking } = bookingDetails;

  const placeDetails = useSelector((state) => state.placeDetails);
  const { loading, error, place } = placeDetails;

  const bookingPay = useSelector((state) => state.bookingPay);
  const { loading: loadingPay, success: successPay } = bookingPay;

  useEffect(() => {
    dispatch(listDetailsPlace(id));
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (successPay) {
      dispatch({ type: BOOKING_PAY_RESET });
    } else if (!isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, successPay, isPaid, place]);

  const successPaymentHandler = (paymentResult) => {
    setIsPaid(true);
    dispatch(
      createOrder({
        placeName: place.name,
        numberOfTicket: Number(qty),
        image: place.image,
        originCountry: place.originCountry,
        flightDate: place.flightDate,
        type: place.type,
        paymentMethod: 'PayPal',
        placePrice: place.price,
        totalPrice: place.price * qty,
      })
    );
    update();
    console.log(paymentResult);
    dispatch(payOrder(order._id, paymentResult));
  };

  const update = () => {
    setIsPaid(true);
    dispatch(
      updatePlace({
        _id: id,
        name: place.name,
        price: place.price,
        image: place.image,
        type: place.type,
        originCountry: place.originCountry,
        description: place.description,
        numberOfSeat: place.numberOfSeat - qty,
      })
    );

    console.log(place.numberOfSeat - qty);
  };

  return (
    <>
      <Meta title={'Travel+ | Payment'} />

      <Link className="btn btn-info my-3" to={`/places/${id}`}>
        Go Back
      </Link>

      <FormContainer>
        <hr></hr>
        <h1>PAYMENT SCREEN</h1>
        <hr></hr>
        <h1></h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger"> {error}</Message>
        ) : (
          <Row>
            <Col md={4}>
              <Image src={place.image} alt={place.name} fluid rounded />
            </Col>
            <Row md={7}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{place.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Price For Ticket: </strong> ${place.price}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>FlightDate: </strong> {place.flightDate}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Origin Country: </strong> {place.originCountry}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Type:</strong> {place.type}
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Number Of Ticket's: </strong> {qty}
                </ListGroupItem>
              </ListGroup>
            </Row>
            <h1></h1>
            <h1></h1>
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
                  {!isPaid && (
                    <ListGroupItem>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <PayPalButton
                          amount={place.price * qty}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    {isPaid && <Message variant="success">PAID</Message>}
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Row>
            {loadingBooking && <Loader />}
            {errorBooking && <Message variant="danger">{errorBooking}</Message>}
          </Row>
        )}
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
