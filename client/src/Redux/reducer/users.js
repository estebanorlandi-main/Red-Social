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


    case ADD_USER:
      let nuevos2 = JSON.parse(localStorage.getItem("NewUsers")) || [];
      return { ...state, users: [...state.users, ...nuevos2]};

    case GET_USER:
      let nuevos = JSON.parse(localStorage.getItem("NewUsers")) || [];
      return {
        ...state,
        profile: [...state.users,...nuevos].filter(
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
