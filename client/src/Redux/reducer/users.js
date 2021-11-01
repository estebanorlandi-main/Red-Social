import users from "../../Mockups/users.json";
import { FILTER_INPUT } from "../actions/SearchBar";

const initialState = {
  users,
  filteredUsers: [],
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case FILTER_INPUT:
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

    default:
      return state;
  }
}
