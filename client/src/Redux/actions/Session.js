import axios from "axios";
import { ERROR } from "./Errors";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";
export const CONVERSATION = "CONVERSATION";
export const UPDATE_USER = "UPDATE_USER";
export const VALIDATE_EMAIL = "VALIDATE_EMAIL";
export const VALIDATE_USERNAME = "VALIDATE_USERNAME";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";

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

export function validateEmail(email) {
  return (dispatch) =>
    axios
      .get(`http://localhost:3001/user/validate/email/${email}`)
      .then((res) => dispatch({ type: VALIDATE_EMAIL, payload: res }))
      .catch((e) => console.log(e));
}
export function validateUsername(username) {
  return (dispatch) =>
    axios
      .get(`http://localhost:3001/user/validate/username/${username}`)
      .then((res) => dispatch({ type: VALIDATE_USERNAME, payload: res }))
      .catch((e) => console.log(e));
}

export function updatePassword(password, query) {
  return (dispatch) =>
    axios
      .post(
        `http://localhost:3001/validate/password/generated${query}`,
        password
      )
      .then((res) => dispatch({ type: UPDATE_PASSWORD, payload: res }));
}

export function conversation(from, to) {
  return (dispatch) =>
    axios
      .post("http://localhost:3001/conversation", {
        senderId: from,
        receiverId: to,
      })
      .then((res) => dispatch({ type: CONVERSATION, payload: res.data }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
}

