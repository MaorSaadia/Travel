import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  placeListReducer,
  placeDetailsReducer,
  placeDeleteReducer,
  placeCreateReducer,
  placeUpdateReducer,
} from './reducers/placeReducer';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpadateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducer';
import {
  bookingCreateReducer,
  bookingDetailsReducer,
  bookingPayReducer,
  bookingListMyReducer,
} from './reducers/bookingReducer';

const reducer = combineReducers({
  placeList: placeListReducer,
  placeDetails: placeDetailsReducer,
  placeDelete: placeDeleteReducer,
  placeCreate: placeCreateReducer,
  placeUpdate: placeUpdateReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpadateProfile: userUpadateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  bookingCreate: bookingCreateReducer,
  bookingDetails: bookingDetailsReducer,
  bookingPay: bookingPayReducer,
  bookingListMy: bookingListMyReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const intialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
