import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listPlaces, deletePlace, createPlace } from '../actions/placeActions';
import { PLACE_CREATE_RESET } from '../constants/placeConstants';

const PlaceListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const placeList = useSelector((state) => state.placeList);
  const { loading, error, places } = placeList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const placeDelete = useSelector((state) => state.placeDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = placeDelete;

  const placeCreate = useSelector((state) => state.placeCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    place: createdPlace,
  } = placeCreate;

  useEffect(() => {
    dispatch({ type: PLACE_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate('/login');
    }
    if (successCreate) {
      navigate(`/admin/place/${createdPlace._id}/edit`);
    } else {
      dispatch(listPlaces());
    }
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createPlace]);

  const deleteHandler = (id) => {
    if (window.confirm(`Are You Sure You Want to Delete`)) {
      dispatch(deletePlace(id));
    }
  };

  const createPlaceHandler = () => {
    dispatch(createPlace());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>PLACES</h1>
        </Col>
        <Col className="text-right"></Col>
        <Button className="my-3" onClick={createPlaceHandler}>
          <i className="fas fa-plus"></i> Create Place
        </Button>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>COUNTRY</th>
                <th>CITY</th>
                <th>PRICE</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {places.map((place) => (
                <tr key={place._id}>
                  <td>{place._id}</td>
                  <td>{place.name.split(',')[1]}</td>
                  <td>{place.name.split(',')[0]}</td>
                  <td>{place.price}$</td>
                  <td>
                    {' '}
                    <LinkContainer to={`/admin/place/${place._id}/edit`}>
                      <Button clsssname="btn-sm" variant="dark">
                        <i
                          className="fas fa-edit"
                          style={{ color: 'LightSteelBlue' }}
                        ></i>
                      </Button>
                    </LinkContainer>{' '}
                  </td>
                  <td>
                    {' '}
                    <Button
                      className="btn-sm"
                      variant="dark"
                      onClick={() => deleteHandler(place._id)}
                    >
                      <i
                        className="fas fa-trash"
                        style={{ color: 'Tomato' }}
                      ></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default PlaceListScreen;
