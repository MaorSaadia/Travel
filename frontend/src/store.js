import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { placeListReducer, placeDetailsReducer } from './reducers/placeReducer';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer';

const reducer = combineReducers({
  placeList: placeListReducer,
  placeDetails: placeDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
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
