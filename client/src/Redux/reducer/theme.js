import { getLocal, saveLocal } from "../../utils/storage";
import { CHANGE_THEME, CHANGE_COLOR } from "../actions/theme";

const initialState = getLocal("codenet_theme");

/*
 * {
 *  theme: 0 || 1,
 *  color: 0-3,
 * }
 */

export default function root(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return saveLocal("codenet_theme", { ...state, theme: action.payload });

    case CHANGE_COLOR:
      return saveLocal("codenet_theme", { ...state, color: action.payload });

    default:
      return state;
  }
}
