import { SIGN_UP, LOG_IN, LOG_OUT, UPDATE_USER, VALIDATE_EMAIL, VALIDATE_USERNAME, UPDATE_PASSWORD, NEW_REGISTER, VALIDATE_ACCOUNT, SEND_RESET_PASSWORD, SEARCH_TOKEN } from "../actions/Session";

import Cookie from "universal-cookie";
const cookie = new Cookie();

const initialState = cookie.get("codenet_user") || {};

export default function root(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      cookie.set("codenet_user", action.payload.data.user, { path: "/" });
      console.log(cookie)
      return cookie.get("codenet_user");

    case SIGN_UP:
      cookie.set("codenet_user", action.payload.data.user, { path: "/" });
      return cookie.get("codenet_user");

    case LOG_OUT:
      cookie.remove("codenet");
      cookie.remove("codenet_user");
      return {};

    case UPDATE_USER:
      cookie.set("codenet_user", action.payload.data.user, { path: "/" });
      return cookie.get("codenet_user");

    case VALIDATE_EMAIL:
      return {
        ...state
      };

    case VALIDATE_USERNAME:
      return {
        ...state
      }
    case UPDATE_PASSWORD:
      return {
        ...state
      }
    case NEW_REGISTER:
      return {
        ...state
      }
    case VALIDATE_ACCOUNT:
      return{
        ...state
      }
    case SEND_RESET_PASSWORD:
      return {
        ...state
      }
    case SEARCH_TOKEN:
      return {
        ...state
      }

    default:
      return state;
  }
}
