import { SEARCH_USER, GET_USER, REMOVE_PROFILE, GET_USERS,NEW_MSG,BAN_USER_ADMIN } from "../actions/Users";

const initialState = {
  users: [],
  profile: {},
  convers:{}
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

    case GET_USERS:
      return {
        ...state,
        convers: action.payload.data,
      };

    case NEW_MSG:
      return {
        ...state
      };

    case REMOVE_PROFILE:
      return {
        ...state,
        profile: {},
      };

    case BAN_USER_ADMIN:
      return{
        ...state
      }

    default:
      return state;
  }
}