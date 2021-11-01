import posts from "../../Mockups/posts.json";

const initialState = {
  posts: posts,
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case "POST_CHANGE_NAME":
      return { ...state, name: action.payload };

    default:
      return state;
  }
}
