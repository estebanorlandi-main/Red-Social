import { SEARCH_USER, GET_USER, UPDATE_USER } from "../actions/Users";

const initialState = {
  users: [],
  profile: {},
};

export default function root(state = initialState, action) {
  switch (action.type) {
    // SearchBar
    case SEARCH_USER:
      return {
        ...state,
        users: action.payload.data,
      };

    // Perfil del usuario
    case GET_USER:
      return {
        ...state,
        profile: action.payload.data,
      };

    default:
      return state;
  }
}
