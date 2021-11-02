export const SEARCH_USER = "SEARCH_USER";
export const ADD_USER = "ADD_USER";
export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";

export function searchUser(users, input) {
  return function (dispatch) {
    dispatch({ type: SEARCH_USER, payload: users, input });
  };
}

// Solo esta para añadirlo a los mockups
export function addUser(user) {
  return { type: ADD_USER, payload: user };
}

export function getUser(user) {
  return { type: GET_USER, payload: user };
}

export function updateUser(username, data) {
  return { type: UPDATE_USER, payload: { username, ...data } };
}
