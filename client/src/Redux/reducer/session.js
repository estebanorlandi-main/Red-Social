import { SIGN_UP, LOG_IN, LOG_OUT, UPDATE_USER } from "../actions/Session";

const initialState = JSON.parse(localStorage.getItem("CodeNet")) || {};

export default function root(state = initialState, action) {
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

    case UPDATE_USER:
      localStorage.removeItem("CodeNet");
      const newData = {
        ...state,
        name: action.user.name,
        lastname: action.user.lastname,
        about: action.user.about,
        tags: action.user.tags,
      };
      localStorage.setItem("CodeNet", JSON.stringify(newData));
      return newData;

    default:
      return state;
  }
}
