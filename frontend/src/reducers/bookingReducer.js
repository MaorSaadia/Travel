import {
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_LIST_MY_FAIL,
  BOOKING_LIST_MY_REQUEST,
  BOOKING_LIST_MY_RESET,
  BOOKING_LIST_MY_SUCCESS,
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
  BOOKING_PAY_FAIL,
  BOOKING_PAY_REQUEST,
  BOOKING_PAY_RESET,
  BOOKING_PAY_SUCCESS,
} from '../constants/bookingConstants';

export const bookingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_CREATE_REQUEST:
      return {
        loading: true,
      };
    case BOOKING_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case BOOKING_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const bookingDetailsReducer = (
  state = { loading: true, bookingPlace: [] },
  action
) => {
  switch (action.type) {
    case BOOKING_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BOOKING_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case BOOKING_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_PAY_REQUEST:
      return {
        loading: true,
      };
    case BOOKING_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case BOOKING_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BOOKING_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case BOOKING_LIST_MY_REQUEST:
      return {
        loading: true,
      };
    case BOOKING_LIST_MY_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case BOOKING_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BOOKING_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case BOOKING_LIST_REQUEST:
      return {
        loading: true,
      };
    case BOOKING_LIST_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case BOOKING_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
