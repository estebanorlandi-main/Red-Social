import axios from "axios";
import { ERROR } from "./Errors";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";
export const UPDATE_USER = "UPDATE_USER";

// - Modelo -
// username
// name
// lastname
// password
// email
// gitaccount
// image
// about
// tags

export function singUp(user) {
  return (dispatch) =>
    axios
      .post(`http://localhost:3001/user/register`, user, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: SIGN_UP, payload: res });
      })
      .catch((err) => dispatch({ type: ERROR, payload: err }));
}

export function logIn(user) {
  return (dispatch) =>
    axios
      .post(`http://localhost:3001/login`, user, { withCredentials: true })
      .then((res) => dispatch({ type: LOG_IN, payload: res }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
}

export function updateUser(username, user) {
  return (dispatch) =>
    axios
      .put(`http://localhost:3001/user/${username}`, user, {
        withCredentials: true,
      })
      .then((res) => dispatch({ type: UPDATE_USER, payload: res }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
}

export function logOut() {
  return (dispatch) =>
    axios
      .get(`http://localhost:3001/logout`, { withCredentials: true })
      .then((res) => dispatch({ type: LOG_OUT, res }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
}
