export const SHOW_TAGS = "SHOW_TAGS";
export const SAVE_CHANGES = "SAVE_CHANGES";

export function showTags() {
  // let tags = [];
  // axios.get("Tags in the api").then((response) => (tags = response.data));
  // return { type: SHOW_TAGS, payload: tags };
}

export function saveChanges(array) {
  return { type: SAVE_CHANGES, payload: array };
}
