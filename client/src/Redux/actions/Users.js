import axios from "axios";
import { io } from "socket.io-client";
import { ERROR } from "./Errors";

const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const URLS = process.env.REACT_APP_SOCKET_URL || "ws://localhost:8900";

export const SEARCH_USER = "SEARCH_USER";
export const GET_USER = "GET_USER";
export const REMOVE_PROFILE = "REMOVE_PROFILE";
export const FOLLOW_UNFOLLOW = "FOLLOW_UNFOLLOW";
export const GET_USERS = "GET_USERS";
export const NEW_MSG = "NEW_MSG";
export const BAN_USER_ADMIN = "ban_user_admin";

export const SOCKET_CONN = "SOCKET_CONN";

export function searchUser(q) {
  return (dispatch) =>
    axios
      .get(URL + `/user?username=${q}`)
      .then((res) => dispatch({ type: SEARCH_USER, payload: res }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
}

export function getUser(user) {
  return (dispatch) =>
    axios
      .get(URL + `/user/${user}`)
      .then((res) => dispatch({ type: GET_USER, payload: res }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
}

export function removeProfile() {
  return { type: REMOVE_PROFILE, payload: {} };
}

export function getUsers(user) {
  return (dispatch) =>
    axios
      .get(URL + `/test/c/${user}/all`)
      .then((res) => dispatch({ type: GET_USERS, payload: res }))
      .catch((e) => console.log(e));
}

export function newMsg(payload) {
  return (dispatch) =>
    axios
      .post(URL + "/test/c/m/new", payload)
      .then((res) => dispatch({ type: NEW_MSG, payload: res }))
      .catch((e) => console.log(e));
}

export function banUserAdmin(username) {
  return (dispatch) =>
    axios
      .post(URL + `/admin/banUser`, { username }, { withCredentials: true })
      .then((res) => dispatch({ type: BAN_USER_ADMIN, payload: res }))
      .catch((e) => (err) => dispatch({ type: ERROR, payload: err }));
}

export function socketConnection(username) {
  const socket = io("ws://localhost:8900");
  socket.emit("addUser", username);

  return (dispatch) => {
    dispatch({ type: SOCKET_CONN, payload: socket });
  };
}

export function followUnfollow(data, socket) {
  return (dispatch) =>
    axios
      .post(URL + `/follow/`, data, { withCredentials: true })
      .then((res) => {
        // console.log(res.data)
        if (socket && res.data.username) {
          socket.emit("setFollow", {
            info: res.data.followers,
            receiverName: res.data.username,
          });
        }

        dispatch({ type: FOLLOW_UNFOLLOW, payload: res });
      })
      .catch((e) => (err) => dispatch({ type: ERROR, payload: err }));
}
