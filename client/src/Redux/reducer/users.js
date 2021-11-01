import users from "../../Mockups/users.json";

const initialState = {
  users,
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER":
      let arr = state.users
      arr.push(action.payload)
      return {
        ...state,
        users: arr
      }
    default:
      return state;
  }
}
