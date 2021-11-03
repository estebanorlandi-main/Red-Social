import axios from "axios";
export const SHOW_TAGS = "SHOW_TAGS";
export const SAVE_CHANGES = "SAVE_CHANGES";
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_UP = "SIGN_UP";
export const CHANGE_SESSION = "CHANGE_SESSION";

// localhost:3001/user
// localhost:3001/user/register

// username
// name
// lastname
// password
// email
// github
// image
// about
// tags

export function singUp(user) {
  return (dispatch) =>
    axios
      .post(`http://localhost:3001/user/register`, user)
      .then((res) => dispatch({ type: SIGN_UP, payload: res, user }));
}

export function logIn(user) {
  return (dispatch) =>
    axios
      .post(`http://localhost:3001/login`, user)
      .then((res) => dispatch({ type: SIGN_UP, payload: res, user }));
}

export function logOut() {
  return { type: LOG_OUT, payload: {} };
}

export function showTags() {
  // let tags = [];
  // axios.get("Tags in the api").then((response) => (tags = response.data));
  // return { type: SHOW_TAGS, payload: tags };
}

export function saveChanges(array) {
  return { type: SAVE_CHANGES, payload: array };
}

export function ChangeSession(user, obj) {
  return { type: CHANGE_SESSION, payload: { user, data: obj } };
}
