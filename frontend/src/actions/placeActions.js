import axios from 'axios';
import {
  PLACE_LIST_FAIL,
  PLACE_LIST_REQUEST,
  PLACE_LIST_SUCCESS,
  PLACE_DETAILS_FAIL,
  PLACE_DETAILS_REQUEST,
  PLACE_DETAILS_SUCCESS,
  PLACE_DELETE_REQUEST,
  PLACE_DELETE_SUCCESS,
  PLACE_DELETE_FAIL,
  PLACE_CREATE_REQUEST,
  PLACE_CREATE_SUCCESS,
  PLACE_CREATE_FAIL,
  PLACE_UPDATE_REQUEST,
  PLACE_UPDATE_SUCCESS,
  PLACE_UPDATE_FAIL,
} from '../constants/placeConstants';

export const listPlaces =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PLACE_LIST_REQUEST });

      const { data } = await axios.get(`/api/places?keyword=${keyword}`);

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
    dispatch({ type: PLACE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/places/${id}`);

    dispatch({
      type: PLACE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLACE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePlace = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLACE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/places/${id}`, config);

    dispatch({
      type: PLACE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PLACE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPlace = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLACE_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/places`, {}, config);

    dispatch({
      type: PLACE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLACE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePlace = (place) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLACE_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/places/${place._id}`, place, config);

    dispatch({
      type: PLACE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLACE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const updateNumberofTicket = (place) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: PLACE_UPDATE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.put(
//       `/api/payment/${place._id}`,
//       place,
//       config
//     );

//     dispatch({
//       type: PLACE_UPDATE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: PLACE_UPDATE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
