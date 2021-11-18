import axios from "axios";
import { ERROR } from "./Errors";

const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const SIGNUP_ADMIN = "signup_admin";
export const LOGIN_ADMIN = "login_admin";
export const LOGOUT_ADMIN = "logOut_admin";
export const INFO_USER = "INFO_USER";

export function sidnupAdmin(admin) {
  return (dispatch) =>
    axios
      .post(URL + "/admin/register", admin, {
        withCredentials: true,
      })
      .then((res) => dispatch({ type: SIGNUP_ADMIN, payload: res, admin }))
      .catch((e) => console.log("Error in sigup admin", e));
}

export function loginAdmin(admin) {
  return (dispatch) =>
    axios
      .post(URL + "/admin/login", admin, {
        withCredentials: true,
      })
      .then((res) => dispatch({ type: LOGIN_ADMIN, payload: res }))
      .catch((e) => (err) => dispatch({ type: ERROR, payload: err }));
}

export function logOutAdmin() {
  return { type: LOGOUT_ADMIN, payload: {} };
}

export function infoAdmin(username) {
  return (dispatch) =>
    axios
      .post(URL + "/admin/info", { username }, { withCredentials: true })
      .then((res) => dispatch({ type: INFO_USER, payload: res }))
      .catch((e) => (err) => dispatch({ type: ERROR, payload: err }));
}
