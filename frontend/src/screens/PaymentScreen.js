import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
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
import { getOrderDetails, payOrder } from '../actions/bookingActions';
import { BOOKING_PAY_RESET } from '../constants/bookingConstants';

const PaymentScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { search } = useLocation();

  const [sdkReady, setSdkReady] = useState(false);

  const qty = search ? Number(search.split('=')[1]) : 1;

  const bookingDetails = useSelector((state) => state.bookingDetails);
  const { order, loading, error } = bookingDetails;

  const bookingPay = useSelector((state) => state.bookingPay);
  const { loading: loadingPay, success: successPay } = bookingPay;

  useEffect(() => {
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
    if (!order || successPay) {
      dispatch({ type: BOOKING_PAY_RESET });
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, successPay, order]);

  // useEffect(() => {
  //   dispatch(getOrderDetails(id));
  // }, [dispatch, id]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  };

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
            <Image src={order.image} alt={order.placeName} fluid rounded />
          </Col>

          <Row md={7}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{order.placeName}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <strong>Price For Ticket: </strong> ${order.placePrice}
              </ListGroupItem>
              <ListGroupItem>
                <strong>FlightDate: </strong> {order.flightDate}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Origin Country: </strong> {order.originCountry}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Type:</strong> {order.type}
              </ListGroupItem>
              <ListGroupItem>
                <strong>Number Of Ticket's: </strong> {qty}
              </ListGroupItem>{' '}
              <ListGroupItem>
                {order.isPaid ? (
                  <Message variant="success">
                    Paid On {order.paidAt.substring(0, 10)}
                  </Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
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
                  <strong>Total: </strong> ${order.totalPrice}
                </ListGroupItem>
                {!order.isPaid && (
                  <ListGroupItem>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card>
          </Row>
        </Row>
      )}
    </>
  );
};

export default PaymentScreen;
