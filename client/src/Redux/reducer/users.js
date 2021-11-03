import { SEARCH_USER, ADD_USER, GET_USER, UPDATE_USER } from "../actions/Users";

const initialState = {
  users: [],
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

    case GET_USER:
      console.log(action.payload.data);
      return {
        ...state,
        profile: action.payload.data,
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
