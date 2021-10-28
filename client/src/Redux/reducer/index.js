//const initialState = {}

import posts from "../../Mockups/posts.json";
import users from "../../Mockups/users.json";

const initialState = {
  posts,
  users,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default rootReducer;
