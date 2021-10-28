export const LIKE = "LIKE";
export const DELETE = "LIKE";
export const UPDATE = "LIKE";

export function likePost(postId) {
  console.log(postId);
  return { type: LIKE, payload: postId };
}

export function deletePost(postId) {
  console.log(postId);
  return { type: LIKE, payload: postId };
}

export function updatePost(postId, data) {
  console.log(postId, data);
  return { type: UPDATE, payload: { postId } };
}
