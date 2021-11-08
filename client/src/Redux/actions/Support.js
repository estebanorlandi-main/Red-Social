import axios from "axios";
import { ERROR } from "./Errors";

export function createSupport(payload) {
  return (dispatch) =>
    axios
      .post("http://localhost:3001/support", payload)
      .then((res) => dispatch({ payload: res }))
      .catch((err) => dispatch({ type: ERROR, payload: err }));
}
