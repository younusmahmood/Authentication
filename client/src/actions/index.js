import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch){
  // Submit email and password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then( response => {
        // If request is good...
        // - Update state to indicate user is authencticated
        dispatch({type: AUTH_USER});
        // - Save JWT token
        localStorage.setItem('token', response.data.token);
        // - Redirect to the route '/feature'
        browserHistory.push('/feature');
        // - Update state to indicate user is authencticated
        dispatch({type: AUTH_USER});
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Wrong Email or Password'))
      });
  }
}

export function signoutUser() {
  localStorage.removeItem('token') //remove token from localStorage

  return {
    type: UNAUTH_USER
  }
}

export function signupUser({ email, password }){
  return  function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER});
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(error => {
        dispatch(authError(error.response.data.error));
      })

  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchMessage() {
  return function(dispatch){
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}
