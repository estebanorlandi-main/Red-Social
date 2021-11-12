import axios from "axios";
import { ERROR } from "./Errors";

export const SEARCH_USER = "SEARCH_USER";
export const GET_USER = "GET_USER";
export const REMOVE_PROFILE = "REMOVE_PROFILE";
export const GET_USERS = "GET_USERS"
export const NEW_MSG = "NEW_MSG";
export const BAN_USER_ADMIN = "ban_user_admin";

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

export function getUsers(user){
  return (dispatch)=>
    axios
      .get(`http://localhost:3001/test/c/${user}/all`)
      .then((res)=> dispatch({type: GET_USERS, payload: res}))
      .catch((e)=> console.log(e))
}

export function newMsg(payload) {
  return (dispatch) =>
    axios
      .post("http://localhost:3001/test/c/m/new", payload)
      .then((res) => dispatch({type:NEW_MSG, payload: res }))
      .catch((e)=> console.log(e))
}

export function banUserAdmin(username) {
  return (dispatch) =>
    axios
      .post(`http://localhost:3001/admin/banUser`, {username}, { withCredentials: true })
      .then( res => dispatch({type:BAN_USER_ADMIN, payload: res}))
      .catch((e) =>(err) => dispatch({ type: ERROR, payload: err }))
}