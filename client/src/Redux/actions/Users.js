import axios from "axios";
export const SEARCH_USER = "SEARCH_USER";
export const GET_USER = "GET_USER";
export const REMOVE_PROFILE = "REMOVE_PROFILE";
export const GET_USERS = "GET_USERS"

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

export function removeProfile() {
  return { type: REMOVE_PROFILE, payload: {} };
}


export function getUsers(user){
  return (dispatch)=>
    axios
      .get("http://localhost:3001/user/")
      .then((res)=> dispatch({type: GET_USERS, payload: res}))
      .catch((e)=> console.log(e))
}
