
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
    const nuevos2 = JSON.parse(localStorage.getItem("NewUsers")) || [];
    let arr = nuevos2.map((user)=>{
      if (action.payload.user === user.username) {
        return({
          ...user,
          name: action.payload.data.name,
          lastName: action.payload.data.lastName,
          about: action.payload.data.about,
          tags: action.payload.data.tags,
        })
      }else {
        return user
      }
    })
    localStorage.setItem("NewUsers", JSON.stringify(arr));
      return (
        {
          ...state,
          name: action.payload.data.name,
          lastName: action.payload.data.lastName,
          about: action.payload.data.about,
          tags: action.payload.data.tags,
        }
      )
    default:
      return state;
  }
}
