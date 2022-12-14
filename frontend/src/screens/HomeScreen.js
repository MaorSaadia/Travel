import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem, Card } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import Places from '../components/Places';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listPlaces } from '../actions/placeActions';
import { useParams } from 'react-router-dom';

const HomeScreen = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();
  //const [selectedDate, setSelectedDate] = useState(null);

  const placeList = useSelector((state) => state.placeList);
  const { loading, error, places } = placeList;

  useEffect(() => {
    dispatch(listPlaces(keyword));
  }, [dispatch, keyword]);

  const [sortState, setSortState] = useState('none');
  const sortMethods = {
    none: { method: (a, b) => null },
    PriceLowHigh: { method: (a, b) => (a.price < b.price ? -1 : 1) },
    PriceHighLow: { method: (a, b) => (a.price > b.price ? -1 : 1) },
    MostPopular: { method: (a, b) => (a._id < b._id ? -1 : 1) },
    Country: {
      method: (a, b) => (a.name.split(',')[1] < b.name.split(',')[1] ? -1 : 1),
    },
  };

  return (
    <>
      <Meta title={'Travel+ | Home'} />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={9} className="justify-content-md-center">
            <Card border="info" style={{ width: '16rem' }}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h5 className="sortby">Sort By:</h5>
                  <select
                    style={{ width: '14rem' }}
                    onChange={(e) => setSortState(e.target.value)}
                  >
                    <option value="MostPopular">Most Popular</option>
                    <option value="PriceLowHigh">Price Low-High</option>
                    <option value="PriceHighLow">Price High-Low</option>
                    <option value="Country">Country</option>
                  </select>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>

          {/* <Col md={3} className="justify-content-md-center">
            <Card border="info" style={{ width: '17rem' }}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h5 className="sortby">Chosse A Date:</h5>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    isClearable
                    showYearDropdown
                    scrollableMonthYearDropdown
                  />
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col> */}

          <Row>
            {places.sort(sortMethods[sortState].method).map((place) => (
              <Col key={place._id} sm={12} md={6} lg={4} xl={4}>
                <Places places={place} />
              </Col>
            ))}
          </Row>
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
