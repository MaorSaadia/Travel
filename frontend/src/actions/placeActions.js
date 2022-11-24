import axios from 'axios';
import {
  PLACE_LIST_FAIL,
  PLACE_LIST_REQUEST,
  PLACE_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from '../constants/placeConstants';

export const listPlaces = () => async (dispatch) => {
  try {
    dispatch({ type: PLACE_LIST_REQUEST });

    const { data } = await axios.get('/api/places');

    dispatch({
      type: PLACE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLACE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listDetailsPlace = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/places/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
