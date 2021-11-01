import users from "../../Mockups/users.json";

const initialState = {
  users,
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case "PROFILE_CHANGE_NAME":
      return { name: action.payload };

    default:
      return state;
  }
}
