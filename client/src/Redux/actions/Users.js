import axios from "axios";
export const SEARCH_USER = "SEARCH_USER";
export const ADD_USER = "ADD_USER";
export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";

export function searchUser(users, input) {
  return function (dispatch) {
    dispatch({ type: SEARCH_USER, payload: users, input });
  };
}

export function getUser(user) {
  return (dispatch) =>
    axios
      .get(`http://localhost:3001/user/${user}`)
      .then((res) => dispatch({ type: GET_USER, payload: res }));
}
