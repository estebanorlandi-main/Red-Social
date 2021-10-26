//const initialState = {}

import posteos from "../../Mockups/post.json";
import users from "../../Mockups/users.json";
import comments from "../../Mockups/comments.json";

const initialState = {
  posteos,
  users,
  comments,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default rootReducer;

