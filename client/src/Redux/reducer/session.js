
const initialState = JSON.parse(localStorage.getItem("CodeNet")) || {};

export default function root(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN":
      return action.payload
    case "SING_UP":
      return action.payload
    case "LOG_OUT":
      return {}
    default:
      return state;
  }
}
