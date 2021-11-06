import axios from "axios";
import { ERROR } from "./Errors";

export const SEARCH_USER = "SEARCH_USER";
export const GET_USER = "GET_USER";
export const REMOVE_PROFILE = "REMOVE_PROFILE";

export function searchUser(q) {
  return (dispatch) =>
    axios
      .get(`http://localhost:3001/user?username=${q}`)
      .then((res) => dispatch({ type: SEARCH_USER, payload: res }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
}

export function getUser(user) {
  return (dispatch) =>
    axios
      .get(`http://localhost:3001/user/${user}`)
      .then((res) => dispatch({ type: GET_USER, payload: res }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
}

export function removeProfile() {
  return { type: REMOVE_PROFILE, payload: {} };
}
