import axios from "axios";
import { ERROR } from "./Errors";

axios.defaults.withCredentials = true;
const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const POST_CREATE = "POST_CREATE";
export const POST_LIKE = "POST_LIKE";
export const POST_SHARE = "POST_SHARE";
export const POST_COMMENT = "POST_COMMENT";
export const POST_DELETE = "POST_DELETE";
export const POST_UPDATE = "POST_UPDATE";
export const GET_POSTS = "GET_POSTS";
export const GET_POST_FOR_ID = "GET_POST_FOR_ID";
export const GET_POST_FOR_USERNAME = "GET_POST_FOR_USERNAME";
export const UPDATE_PAGE = "UPDATE_PAGE";
export const CLEAR_POST = "CLEAR_POST";
export const SET_TAGS = "SET_TAGS";
export const BANPOST_ADMIN = "banPost_admin";
export const BANCOMMENT_ADMIN = "banComment_admin";
export const COMMENT_DELETE = "comment_delete";
// Crear Posteo
// return (dispatch) => axios.post('localhost:3001/post')
//  -> title
//  -> content
//  -> image
//  -> tag
//  -> username
//  -> likes = 0
// |-> tiene error
// |-> tiene success

// Posteos trae todo
//  -> ['', '', '', '']

// comentario devuelve el comentario creado

export function createPost(data, orden, tags, seguidos) {
  return (dispatch) =>
    axios
      .post(URL + `/post/?orden=${orden}&tags=${tags}&seguido=${seguidos}`, data, {
        withCredentials: true,
      })
      .then((res) => dispatch({ type: POST_CREATE, payload: res.data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));

  // return { type: POST_CREATE, payload: data };
}

export function deletePost(postId) {
  return (dispatch) =>
    axios
      .delete(URL + `/post/${postId}`, { withCredentials: true })
      .then((res) => dispatch({ type: POST_DELETE, payload: res.data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));
}

export function updatePost(postId, data) {
  return (dispatch) =>
    axios
      .put(URL + `/post/${postId}`, data, {
        withCredentials: true,
      })
      .then((res) => dispatch({ type: POST_UPDATE, payload: res.data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));

  //return { type: POST_UPDATE, payload: { postId } };
}

export function commentPost(postid, content, username, socket) {
  return (dispatch) =>
    axios
      .post(
        URL + `/comment`,
        { postid, content, username },
        { withCredentials: true }
      )
      .then((res) => {
        socket.emit("reloadPostInfo", res.data);

        dispatch({
          type: POST_COMMENT,
          payload: res.data,
        });
      })
      .catch((error) => dispatch({ type: ERROR, payload: error }));

  //return { type: POST_COMMENT, payload: { idPost, text, user } };
}

export function getPosts(page, tag, orden, seguidos) {
  return (dispatch) =>
    axios
      .get(URL + `/post?page=${page}&tag=${tag}&orden=${orden}&seguido=${seguidos}`)
      .then((res) => dispatch({ type: GET_POSTS, payload: res.data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));
}

export function getPostForId(id) {
  console.log("action")
  return (dispatch) =>
    axios
      .get(URL + `/post/${id}`)
      .then((res) => dispatch({ type: GET_POST_FOR_ID, payload: res.data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));
}

export function getPostForUsername(username) {
  return (dispatch) =>
    axios
      .get(URL + `/`, username)
      .then((res) =>
        dispatch({ type: GET_POST_FOR_USERNAME, payload: res.data })
      )
      .catch((error) => dispatch({ type: ERROR, payload: error }));
}

export function updatePage(page) {
  return { type: UPDATE_PAGE, payload: page };
}

export function likePost(data, socket) {
  return (dispatch) =>
    axios.post(URL + "/likes", data, { withCredentials: true }).then((res) => {
      if (socket) {
        socket.emit("reloadPostInfo", res.data);
      }

      dispatch({
        type: POST_LIKE,
        payload: res.data,
      });
    });
}

export function getTags() {
  return (dispatch) =>
    axios.get(URL + "/tags", { withCredentials: true }).then((res) => {
      dispatch({
        type: SET_TAGS,
        payload: res.data,
      });
    });
}

export function loadTags() {
  return (dispatch) =>
    axios.post(URL + "/tags", { withCredentials: true }).then((res) => {});
}
export function banPost(idPost) {
  return (dispatch) =>
    axios
      .post(URL + `/admin/banPost`, { idPost }, { withCredentials: true })
      .then((res) => dispatch({ type: BANPOST_ADMIN, payload: res }))
      .catch((e) => (err) => dispatch({ type: ERROR, payload: err }));
}

export function banComment(idComent) {
  return (dispatch) => {
    axios
      .post(
        URL + `/admin/banComment`,
        { idComment: idComent },
        { withCredentials: true }
      )
      .then((res) => dispatch({ type: BANCOMMENT_ADMIN, payload: res }))
      .catch((e) => (err) => dispatch({ type: ERROR, payload: err }));
  };
}

export function deleteComment(commentId) {
  return (dispatch) =>
    axios
      .delete(URL + `/comment/${commentId}`, {
        withCredentials: true,
      })
      .then((res) => dispatch({ type: COMMENT_DELETE, payload: res.data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));
}
