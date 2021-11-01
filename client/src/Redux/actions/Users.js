export const ADD_USER = "ADD_USER";



export function AddUser(obj) {
  return { type: ADD_USER, payload: obj };
}
