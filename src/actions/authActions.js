import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER } from './types';

const host = 'https://koa-blog-rest.herokuapp.com';

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(`${host}/api/register`, userData)
    .then((res) => history.push('/login'))
    .catch((err) => {});
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post(`${host}/api/login`, userData)
    .then((res) => {
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {});
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Update User
export const updateUser = (userData) => (dispatch) => {
  axios
    .put(`${host}/api/update-user`, userData)
    .then((res) => {
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {});
};
