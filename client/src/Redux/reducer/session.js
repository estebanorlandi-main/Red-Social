const initialState = {};

export default function root(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN":
      return action.patload
    case "SING_UP":
      return action.payload
    case "LOG_OUT":
      return {}
    default:
      return state;
  }
}
