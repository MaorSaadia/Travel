import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const { location } = useLocation();
  const redirect = location ? location.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage('Passwords Do Not Match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <>
      <Meta title={'Travel+ | Register'} />
      <FormContainer>
        <div>
          <h1> </h1>
          <h1> </h1>
        </div>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="name">
            <FormLabel>Name:</FormLabel>
            <FormControl
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></FormControl>
          </FormGroup>
          <h5> </h5>
          <FormGroup controlId="email">
            <FormLabel>Email Address:</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></FormControl>
          </FormGroup>
          <h5> </h5>

          <FormGroup controlId="password">
            <FormLabel>Password:</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></FormControl>
          </FormGroup>
          <h5> </h5>

          <FormGroup controlId="confirmPassword">
            <FormLabel>Confirm Password:</FormLabel>
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
              Register
            </Button>
          </div>
        </Form>
        <Row className="py-3">
          <Col>
            Already Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
