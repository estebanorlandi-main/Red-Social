import axios from "axios";
export const POST_CREATE = "POST_CREATE";
export const POST_LIKE = "POST_LIKE";
export const POST_SHARE = "POST_SHARE";
export const POST_COMMENT = "POST_COMMENT";
export const POST_DELETE = "POST_DELETE";
export const POST_UPDATE = "POST_UPDATE";
export const GET_POSTS = "GET_POSTS";
export const GET_POST_FOR_ID = "GET_POST_FOR_ID";
export const GET_POST_FOR_USERNAME = "GET_POST_FOR_USERNAME";

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
    axios.post("localhost:3001/post", data).then((res) => console.log(res));

  // return { type: POST_CREATE, payload: data };
}

export function deletePost(postId) {
  return (dispatch) =>
    axios
      .delete(`localhost:3001/post/${postId}`)
      .then((res) => console.log(res));

  // return { type: POST_DELETE, payload: postId };
}

export function updatePost(postId, data) {
  return (dispatch) =>
    axios
      .put(`localhost:3001/post/${postId}`, data)
      .then((res) => console.log(res));

  //return { type: POST_UPDATE, payload: { postId } };
}

export function commentPost(postId, content, username) {
  return (dispatch) =>
    axios
      .post(`localhost:3001/`, { postId, content, username })
      .then((res) => console.log(res));

  //return { type: POST_COMMENT, payload: { idPost, text, user } };
}

export function getPosts() {
  return (dispatch) =>
    axios
      .get(`http://localhost:3001/post`)
      .then((res) => dispatch({ type: GET_POSTS, payload: res.data }));
}

export function getPostForId(id) {
  return (dispatch) =>
    axios
      .get(`localhost:3001/${id}`)
      .then((res) => dispatch({ type: GET_POST_FOR_ID, payload: res.data }));
}

export function getPostForUsername(username) {
  return (dispatch) =>
    axios
      .get(`localhost:3001/`, username)
      .then((res) =>
        dispatch({ type: GET_POST_FOR_USERNAME, payload: res.data })
      );
}

/*
export function likePost(idPost, username) {
  return { type: POST_LIKE, payload: { idPost, username } };
}
export function sharePost(postId) {
  console.log(postId);
  return { type: POST_SHARE, payload: postId };
}
export function updatePost(postId, data) {
  console.log(postId, data);
  return { type: POST_UPDATE, payload: { postId } };
}
*/
