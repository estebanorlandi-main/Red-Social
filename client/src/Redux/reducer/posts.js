import { POST_LIKE, POST_COMMENT } from "../actions/Post";

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

    case POST_COMMENT:
      return {
        ...state,
        posts: posts.map((post) => {
          if (post.idPost === action.payload.idPost) {
            post.comments.push({
              user: action.payload.user,
              text: action.payload.text,
            });
          }

          return post;
        }),
      };

    default:
      return state;
  }
}
