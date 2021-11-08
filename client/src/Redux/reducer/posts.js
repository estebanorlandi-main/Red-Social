import {
  POST_LIKE,
  POST_COMMENT,
  GET_POSTS,
  GET_POST_FOR_ID,
  GET_POST_FOR_USERNAME,
  UPDATE_PAGE,
  CLEAR_POST,
} from "../actions/Post";

const initialState = {
  posts: [],
  post: {},
  page: 0,
  totalPages: 0,
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
      if (action.page === 0) {
        return {
          ...state,
          posts: action.payload.posts,
        };
      }
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        totalPages: action.payload.totalPages,
      };

    case GET_POST_FOR_ID:
      return {
        ...state,
        post: action.payload,
      };

    case GET_POST_FOR_USERNAME:
      return {
        ...state,
        post: action.payload,
      };

    case UPDATE_PAGE:
      if (action.payload.bol) {
        return {
          ...state,
          page: -1,
          posts: action.payload.post,
        };
      } else {
        return {
          ...state,
          page: state.page + 1,
        };
      }

    case CLEAR_POST:
      return { ...initialState, posts: [] };

    default:
      return state;
  }
}
