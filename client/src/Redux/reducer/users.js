import users from "../../Mockups/users.json";

const initialState = {
  users,
};

export default function root(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
