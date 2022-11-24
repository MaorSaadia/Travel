import {
  PLACE_LIST_FAIL,
  PLACE_LIST_REQUEST,
  PLACE_LIST_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
} from '../constants/placeConstants';

export const placeListReducer = (state = { places: [] }, action) => {
  switch (action.type) {
    case PLACE_LIST_REQUEST:
      return { loading: true, places: [] };
    case PLACE_LIST_SUCCESS:
      return {
        loading: false,
        places: action.payload,
      };
    case PLACE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const placeDetailsReducer = (state = { place: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, place: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
