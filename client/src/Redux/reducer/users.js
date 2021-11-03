import { SEARCH_USER, GET_USER, UPDATE_USER } from "../actions/Users";

const initialState = {
  users: [],
  filteredUsers: [],
  profile: {},
};

export default function root(state = initialState, action) {
  switch (action.type) {
    // SearchBar
    case SEARCH_USER:
      let nuevos3 = JSON.parse(localStorage.getItem("NewUsers")) || [];
      if (action.input === "") {
        return {
          ...state,
          filteredUsers: [],
        };
      } else {
        return {
          ...state,
          filteredUsers: [...action.payload, ...nuevos3].filter((user) => {
            if (
              user.username.toLowerCase().includes(action.input.toLowerCase())
            ) {
              return user;
            }
          }),
        };
      }

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
