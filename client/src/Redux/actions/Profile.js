export const SHOW_TAGS = "SHOW_TAGS";
export const SAVE_CHANGES = "SAVE_CHANGES";
<<<<<<< HEAD
export const LOG_IN = "LOG_IN"
export const LOG_OUT = "LOG_OUT"
export const SING_UP = "SING_UP"
export const CHANGE_USER = "CHANGE_USER"
=======
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const SING_UP = "SING_UP";
>>>>>>> 48d56d0228538bc5d829f0a3afd36b675abaa131
export function showTags() {
  // let tags = [];
  // axios.get("Tags in the api").then((response) => (tags = response.data));
  // return { type: SHOW_TAGS, payload: tags };
}

export function saveChanges(array) {
  return { type: SAVE_CHANGES, payload: array };
}

export function LogIn(obj) {
  return { type: LOG_IN, payload: obj };
}
export function LogOut() {
  return { type: LOG_OUT, payload: {} };
}
<<<<<<< HEAD
export function SingUp(obj){
  return {type: SING_UP, payload:obj}
=======
export function SingUp(obj) {
  console.log(obj);
  return { type: SING_UP, payload: obj };
>>>>>>> 48d56d0228538bc5d829f0a3afd36b675abaa131
}
export function ChangeUser(obj){
  return {type: CHANGE_USER, payload:obj}
}
