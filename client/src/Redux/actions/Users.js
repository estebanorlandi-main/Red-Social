export const SEARCH_USER = "SEARCH_USER";

export function searchUser(users, input) {
  return function (dispatch) {
    dispatch({ type: SEARCH_USER, payload: users, input });
  };
}
