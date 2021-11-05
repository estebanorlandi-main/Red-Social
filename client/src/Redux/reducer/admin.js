import { LOGIN_ADMIN, SIGNUP_ADMIN,LOGOUT_ADMIN } from "../actions/Admin";

const initialState = JSON.parse(localStorage.getItem("CodeNet")) || {};

export default function root(state = initialState, action){
    switch(action.type){
        case LOGIN_ADMIN:
            if (action.payload.data.Username === action.user.username)
                localStorage.setItem("CodeNet", JSON.stringify(action.user));

            return action.user;
        case SIGNUP_ADMIN:
            if (action.payload.status === 200)
            localStorage.setItem("CodeNet", JSON.stringify(action.user));
    
            return action.user;
        
        case LOGOUT_ADMIN:
            case LOG_OUT:
            localStorage.removeItem("CodeNet");
      return {};
        default:
            return state;

    }   
}