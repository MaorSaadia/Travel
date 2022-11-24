import {
  PLACE_LIST_FAIL,
  PLACE_LIST_REQUEST,
  PLACE_LIST_SUCCESS,
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
