import axios from "axios";
import { ERROR } from "./Errors";

const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const GET_SUPPORT_MESSAGE = "get_support_message";
export const DELETE_MESSAGE_SUPPORT = "DELETE_MESSAGE_SUPPORT";

export function createSupport(payload) {
  return (dispatch) =>
    axios
      .post(URL + "/support", payload, {
        withCredentials: true,
      })
      .then((res) => dispatch({ payload: res }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
}

export function getSupport() {
  return (dispatch) =>
    axios
      .get(URL + `/support`, {
        withCredentials: true,
      })
      .then((res) =>
        dispatch({ type: GET_SUPPORT_MESSAGE, payload: res.data })
      );
}

export function creatReport(data) {
  return (dispatch) =>
    axios
      .post(URL + `/support`, data, { withCredentials: true })
      .then((res) => dispatch({ payload: res }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
}

export function deleteMessageSupport(id) {
  return (dispatch) =>
    axios
      .delete(URL + `/support/${id}`, { withCredentials: true })
      .then((res) => dispatch({ type: DELETE_MESSAGE_SUPPORT, payload: res }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
}

