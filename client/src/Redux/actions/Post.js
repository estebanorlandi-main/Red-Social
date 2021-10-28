export const CREATE_POST = "CREATE_POST";
export const LIKE_POST = "LIKE_POST";
export const SHARE_POST = "SHARE_POST";
export const COMMENT_POST = "COMMENT_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";

export function createPost(data) {
  console.log(data);

  // fetch
  return { type: CREATE_POST, payload: null };
}

export function likePost(postId) {
  console.log(postId);

  // fetch
  return { type: LIKE_POST, payload: postId };
}

export function sharePost(postId) {
  console.log(postId);

  // fetch
  return { type: SHARE_POST, payload: postId };
}

export function commentPost(postId, data) {
  console.log(postId, data);

  // fetch
  return { type: COMMENT_POST, payload: postId };
}

export function deletePost(postId) {
  console.log(postId);

  // fetch
  return { type: DELETE_POST, payload: postId };
}

export function updatePost(postId, data) {
  console.log(postId, data);

  // fetch
  return { type: UPDATE_POST, payload: { postId } };
}
