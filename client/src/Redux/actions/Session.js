import axios from "axios";

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
      .post(`http://localhost:3001/user/register`, user)
      .then((res) => {
        dispatch({ type: SIGN_UP, payload: res });
      })
      .catch((err) => console.log(err));
}

export function logIn(user) {
  return (dispatch) =>
    axios
      .post(`http://localhost:3001/login`, user)
      .then((res) => dispatch({ type: LOG_IN, payload: res, user }))
      .catch((err) => console.log(err));
}

export function updateUser(id, user) {
  return (dispatch) =>
    axios
      .put(`http://localhost:3001/user/${id}`, user)
      .then((res) => dispatch({ type: UPDATE_USER, payload: res, user }))
      .catch((err) => console.log(err));
}

export function logOut() {
  return { type: LOG_OUT, payload: {} };
}
