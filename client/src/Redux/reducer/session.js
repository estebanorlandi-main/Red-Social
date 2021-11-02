
const initialState = JSON.parse(localStorage.getItem("CodeNet")) || {};

export default function root(state = initialState, action) {
  switch (action.type) {
    case "LOG_IN":
      return action.payload
    case "SING_UP":
      const nuevos = JSON.parse(localStorage.getItem("NewUsers")) || [];
      localStorage.setItem("NewUsers", JSON.stringify([...nuevos, action.payload]));
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
