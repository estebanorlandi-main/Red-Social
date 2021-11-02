import users from "../../Mockups/users.json";
import { SEARCH_USER, ADD_USER, GET_USER, UPDATE_USER } from "../actions/Users";

const initialState = {
  users,
  filteredUsers: [],
  profile: {},
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

    case GET_USER:
      return {
        ...state,
        profile: state.users.filter(
          (user) => user.username === action.payload
        )[0],
      };

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.username === action.payload.username)
            return {
              ...user,
              name: action.payload.name,
              lastName: action.payload.lastName,
              about: action.payload.about,
              tags: action.payload.tags,
            };
          return user;
        }),
      };

    default:
      return state;
  }
}
