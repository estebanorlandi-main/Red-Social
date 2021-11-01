import { POST_LIKE } from "../actions/Post";

import posts from "../../Mockups/posts.json";

const initialState = {
  posts: posts,
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case POST_LIKE:
      return {
        ...state,
        posts: posts.map((post) => {
          if (post.idPost === action.payload.idPost) {
            if (post.likes.includes(action.payload.username)) {
              post.likes = post.likes.filter(
                (user) => user !== action.payload.username
              );
            } else post.likes.push(action.payload.username);
          }

          return post;
        }),
      };

    default:
      return state;
  }
}
