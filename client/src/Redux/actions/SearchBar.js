export const FILTER_INPUT = "FILTER_INPUT";

export function filterInput(users, input) {
  return function (dispatch) {
    dispatch({ type: FILTER_INPUT, payload: users, input });
  };
}
