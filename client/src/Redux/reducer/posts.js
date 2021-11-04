import {
  POST_LIKE,
  POST_COMMENT,
  GET_POSTS,
  GET_POST_FOR_ID,
  GET_POST_FOR_USERNAME,
} from "../actions/Post";

const initialState = {
  posts: [],
  post: {},
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case POST_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => {
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
        posts: state.posts.map((post) => {
          if (post.idPost === action.payload.idPost) {
            post.comments.push({
              user: action.payload.user,
              text: action.payload.text,
            });
          }

          return post;
        }),
      };

    case GET_POSTS:
      console.log(action.payload);
      return {
        ...state,
        posts: action.payload,
      };

    case GET_POST_FOR_ID:
      console.log(action.payload);
      return {
        ...state,
        post: action.payload,
      };

    case GET_POST_FOR_USERNAME:
      console.log(action.payload);
      return {
        ...state,
        post: action.payload,
      };

    default:
      return state;
  }
}
