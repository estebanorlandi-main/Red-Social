import axios from "axios";
export const POST_CREATE = "POST_CREATE";
export const POST_LIKE = "POST_LIKE";
export const POST_SHARE = "POST_SHARE";
export const POST_COMMENT = "POST_COMMENT";
export const POST_DELETE = "POST_DELETE";
export const POST_UPDATE = "POST_UPDATE";
export const GET_POSTS = "GET_POSTS";
import axios from "axios";
import { ERROR } from "./Errors";

axios.defaults.withCredentials = true;

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

export function createPost(data) {
  return (dispatch) =>
    axios
      .post("http://localhost:3001/post", data, { withCredentials: true })
      .then((res) => ({ type: POST_CREATE, payload: res.data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));

  // return { type: POST_CREATE, payload: data };
}

export function deletePost(postId) {
  return (dispatch) =>
    axios
      .delete(`http://localhost:3001/post/${postId}`, { withCredentials: true })
      .then((res) => ({ type: POST_DELETE, payload: res.data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));

  // return { type: POST_DELETE, payload: postId };
}

export function updatePost(postId, data) {
  return (dispatch) =>
    axios
      .put(`http://localhost:3001/post/${postId}`, data, {
        withCredentials: true,
      })
      .then((res) => ({ type: POST_UPDATE, payload: res.data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));

  //return { type: POST_UPDATE, payload: { postId } };
}

export function commentPost(postId, content, username) {
  return (dispatch) =>
    axios
      .post(`localhost:3001/`, { postId, content, username })
      .then((res) => console.log(res))
      .catch((error) => dispatch({ type: ERROR, payload: error }));

  //return { type: POST_COMMENT, payload: { idPost, text, user } };
}

export function getPosts(page) {
  return (dispatch) =>
    axios
      .get(`http://localhost:3001/post?page=${page}`)
      .then((res) => dispatch({ type: GET_POSTS, payload: res.data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));
}

export function getPostForId(id) {
  return (dispatch) =>
    axios
      .get(`localhost:3001/${id}`)
      .then((res) => dispatch({ type: GET_POST_FOR_ID, payload: res.data }))
      .catch((error) => dispatch({ type: ERROR, payload: error }));
}

export function getPostForUsername(username) {
  return (dispatch) =>
    axios
      .get(`localhost:3001/`, username)
      .then((res) =>
        dispatch({ type: GET_POST_FOR_USERNAME, payload: res.data })
      )
      .catch((error) => dispatch({ type: ERROR, payload: error }));
}

export function updatePage(bol, post) {
  return { type: UPDATE_PAGE, payload: { bol, post } };
}

export function likePost(idPost, username) {
  return (dispatch) =>
    axios
      .post(
        `http://localhost:3001/likes`,
        { username, idPost },
        { withCredentials: true }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
}

/*
export function sharePost(postId) {
  console.log(postId);
  return { type: POST_SHARE, payload: postId };
}
export function updatePost(postId, data) {
  console.log(postId, data);
  return { type: POST_UPDATE, payload: { postId } };
}
*/
