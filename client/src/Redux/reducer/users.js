import users from "../../Mockups/users.json";
import { SEARCH_USER, ADD_USER } from "../actions/Users";

const initialState = {
  users,
  filteredUsers: [],
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case SEARCH_USER:
      if (action.input === "") {
        return {
          ...state,
          filteredUsers: [],
        };
      } else {
        return {
          ...state,
          filteredUsers: action.payload.filter((user) => {
            if (
              user.username.toLowerCase().includes(action.input.toLowerCase())
            ) {
              return user;
            }
          }),
        };
      }
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
}
