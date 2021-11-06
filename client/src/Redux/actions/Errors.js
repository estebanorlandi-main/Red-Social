export const ERROR = "ERROR";
export const REMOVE_ERROR = "REMOVE_ERROR";

export function removeError(id) {
  return { type: REMOVE_ERROR, payload: id };
}
