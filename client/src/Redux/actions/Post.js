export const POST_CREATE = "POST_CREATE";
export const POST_LIKE = "POST_LIKE";
export const POST_SHARE = "POST_SHARE";
export const POST_COMMENT = "POST_COMMENT";
export const POST_DELETE = "POST_DELETE";
export const POST_UPDATE = "POST_UPDATE";

export function createPost(data) {
  console.log(data);
  return { type: POST_CREATE, payload: data };
}

export function likePost(idPost, username) {
  console.log(idPost, username);
  return { type: POST_LIKE, payload: { idPost, username } };
}

export function sharePost(postId) {
  console.log(postId);
  return { type: POST_SHARE, payload: postId };
}

export function commentPost(postId, data) {
  console.log(postId, data);
  return { type: POST_COMMENT, payload: postId };
}

export function deletePost(postId) {
  console.log(postId);
  return { type: POST_DELETE, payload: postId };
}

export function updatePost(postId, data) {
  console.log(postId, data);
  return { type: POST_UPDATE, payload: { postId } };
}
