import {
  POST_LIKE,
  POST_COMMENT,
  POST_CREATE,
  POST_DELETE,
  POST_UPDATE,
  GET_POSTS,
  GET_POST_FOR_ID,
  GET_POST_FOR_USERNAME,
  UPDATE_PAGE,
  CLEAR_POST,
  SET_TAGS,
} from "../actions/Post";

const initialState = {
  posts: [],
  post: {},
  page: 0,
  totalPages: 0,
  tags:[]
};

export default function root(state = initialState, action) {
  switch (action.type) {
    case POST_CREATE:
      return {
        ...state,
        posts: action.payload.posts,
        totalPages: action.payload.totalPages,
      };

    case POST_LIKE:
      if (action.payload.post) {
        return {
          ...state,
          posts: state.posts.map((post) => {
            if (post.idPost === action.payload.post.idPost) {
              post = action.payload.post;
            }
            return post;
          }),
        };
      }
      return {
        ...state,
      };

    case POST_UPDATE:
      if (action.payload.post) {
        return {
          ...state,
          posts: state.posts.map((post) => {
            if (post.idPost === action.payload.post.idPost) {
              post = action.payload.post;
            }
            return post;
          }),
        };
      }
      return {
        ...state,
      };

    case POST_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.idPost === action.payload.post.idPost) {
            post = action.payload.post;
          }
          return post;
        }),
      };

    case POST_DELETE:
      return { ...state, posts: action.payload.posts };

    case GET_POSTS:
      if (state.page === 0) {
        return {
          ...state,
          posts: action.payload.posts,
          totalPages: action.payload.totalPages,
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
      return {
        ...state,
        page: action.payload,
      };

    case CLEAR_POST:
      return { ...initialState, posts: [] };

    case SET_TAGS:
      return {...state, tags:action.payload}
    default:
      return state;
  }
}
