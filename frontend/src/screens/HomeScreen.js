import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem, Card } from 'react-bootstrap';
import Select from 'react-select';
import Places from '../components/Places';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listPlaces } from '../actions/placeActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const placeList = useSelector((state) => state.placeList);
  const { loading, error, places } = placeList;

  useEffect(() => {
    dispatch(listPlaces());
  }, [dispatch]);

  const options = [
    { value: 'Price Low-High', label: 'Price Low-High' },
    { value: 'Price High-Low', label: 'Price High-Low' },
    { value: 'Most Popular', label: 'Most Popular' },
    { value: 'Country', label: 'Country' },
  ];

  return (
    <>
      <Meta title={'Travel+ | Home'} />

      <h1 className="fancy">Hot Places</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Row className="justify-content-md-center">
            <Card style={{ width: '36rem' }}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h5 className="orderby"> Order By:</h5>
                  <Select
                    className="basic-single"
                    defaultValue={options[2]}
                    options={options}
                  />
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Row>

          {places.map((place) => (
            <Col key={place._id} sm={12} md={6} lg={4} xl={4}>
              <Places places={place} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
