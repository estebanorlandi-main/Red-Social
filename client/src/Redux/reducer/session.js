import { SIGN_UP, LOG_IN, LOG_OUT } from "../actions/Session";

const initialState = JSON.parse(localStorage.getItem("CodeNet")) || {};

export default function root(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case LOG_IN:
      if (action.payload.data.Username === action.user.username)
        localStorage.setItem("CodeNet", JSON.stringify(action.user));

      return action.user;

    case SIGN_UP:
      if (action.payload.status === 200)
        localStorage.setItem("CodeNet", JSON.stringify(action.user));

      return action.user;

    case LOG_OUT:
      localStorage.removeItem("CodeNet");
      return {};

    default:
      return state;
  }
}
