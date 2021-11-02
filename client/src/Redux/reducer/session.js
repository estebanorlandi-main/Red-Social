
const initialState = JSON.parse(localStorage.getItem("CodeNet")) || {};

export default function root(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN":
      return action.payload
    case "SING_UP":
      return action.payload
    case "LOG_OUT":
      return {}
    case "CHANGE_SESSION":
    console.log(action.payload, "change")
      return (
        {
          ...state,
          name: action.payload.name,
          lastName: action.payload.lastName,
          about: action.payload.about,
          tags: action.payload.tags,
        }
      )
    default:
      return state;
  }
}
