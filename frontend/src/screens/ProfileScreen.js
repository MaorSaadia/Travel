import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { getUserDetails, UpadateUserProfile } from '../actions/userActions';
import { listMyOrder } from '../actions/bookingActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpadateProfile = useSelector((state) => state.userUpadateProfile);
  const { success } = userUpadateProfile;

  const bookingListMy = useSelector((state) => state.bookingListMy);
  const { loading: loadingBooking, error: errorBooking, order } = bookingListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrder());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user, navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage('Passwords Do Not Match');
    } else {
      dispatch(UpadateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <>
      <Meta title={'Travel+ | Edit'} />
      <Row>
        <Col md={3}>
          <hr></hr>
          <h1>UPDATE PROFILE</h1>
          <hr></hr>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
              <FormLabel>
                <strong>Name:</strong>
              </FormLabel>
              <FormControl
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </FormGroup>
            <h5> </h5>
            <FormGroup controlId="email">
              <FormLabel>
                <strong>Email Address:</strong>
              </FormLabel>
              <FormControl
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></FormControl>
            </FormGroup>
            <h5> </h5>

            <FormGroup controlId="password">
              <FormLabel>
                <strong>Password:</strong>
              </FormLabel>
              <FormControl
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></FormControl>
            </FormGroup>
            <h5> </h5>

            <FormGroup controlId="confirmPassword">
              <FormLabel>
                <strong>Confirm Password:</strong>
              </FormLabel>
              <FormControl
                type="password"
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></FormControl>
            </FormGroup>

            <div>
              <h2> </h2>
            </div>
            <div className="d-grid gap-3">
              <Button type="submit" variant="primary">
                Update
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={9}>
          <hr></hr>
          <h1>MY BOOKINGS</h1>
          <hr></hr>
          {loadingBooking ? (
            <Loader />
          ) : errorBooking ? (
            <Message variant="danger">{errorBooking}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>TRAVEL NAME</th>
                  <th>TICKETS</th>
                  <th>COST</th>
                  <th>FLIGHT DATE</th>
                </tr>
              </thead>
              <tbody>
                {order?.map((order) => (
                  <tr key={order._id}>
                    <td>{order.placeName}</td>
                    <td>{order.numberOfTicket}</td>
                    <td>{order.totalPrice}$ </td>
                    <td>{order.flightDate} </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
