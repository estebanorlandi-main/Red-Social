import { SIGN_UP, LOG_IN, LOG_OUT, UPDATE_USER } from "../actions/Session";

import Cookie from "universal-cookie";
const cookie = new Cookie();

const initialState = cookie.get("codenet_user") || {};

export default function root(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      cookie.set("codenet_user", action.payload.data.user, { path: "/" });
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

    default:
      return state;
  }
}
