import {
  SIGN_UP,
  LOG_IN,
  LOG_OUT,
  UPDATE_USER,
  VALIDATE_EMAIL,
  VALIDATE_USERNAME,
  UPDATE_PASSWORD,
} from "../actions/Session";

import { saveLocal, getLocal, removeLocal } from "../../utils/storage";

const initialState = getLocal("codenet_user");

export default function root(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return saveLocal("codenet_user", action.payload.data.user);

    case SIGN_UP:
      return saveLocal("codenet_user", action.payload.data.user);

    case LOG_OUT:
      return removeLocal("codenet_user");

    case UPDATE_USER:
      return saveLocal("codenet_user", action.payload.data.user);

    case VALIDATE_EMAIL:
      return {
        ...state,
      };

    case VALIDATE_USERNAME:
      return {
        ...state,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
      };

    default:
      return state;
  }
}
