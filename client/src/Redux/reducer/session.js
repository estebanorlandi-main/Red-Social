import { SIGN_UP, LOG_IN, LOG_OUT, UPDATE_USER } from "../actions/Session";

const initialState = JSON.parse(localStorage.getItem("CodeNet") || "{}");

export default function root(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      localStorage.setItem("CodeNet", JSON.stringify(action.payload.data.user));
      return action.payload.data.user;

    case SIGN_UP:
      console.log(action.payload.data);
      localStorage.setItem("CodeNet", JSON.stringify(action.payload.data.user));
      return action.payload.data.user;

    case LOG_OUT:
      localStorage.removeItem("CodeNet");
      return {};

    case UPDATE_USER:
      localStorage.removeItem("CodeNet");
      localStorage.setItem("CodeNet", JSON.stringify(action.payload.data.user));
      return action.payload.data.user;

    default:
      return state;
  }
}
