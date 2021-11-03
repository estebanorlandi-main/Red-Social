import axios from "axios";
export const SEARCH_USER = "SEARCH_USER";
export const GET_USER = "GET_USER";

export function searchUser(q) {
  return (dispatch) =>
    axios
      .get(`http://localhost:3001/user?username=${q}`)
      .then((res) => dispatch({ type: SEARCH_USER, payload: res }))
      .catch((e) => console.log(e));
}

export function getUser(user) {
  return (dispatch) =>
    axios
      .get(`http://localhost:3001/user/${user}`)
      .then((res) => dispatch({ type: GET_USER, payload: res }))
      .catch((e) => console.log(e));
}
