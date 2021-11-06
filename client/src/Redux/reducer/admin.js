import { LOGIN_ADMIN, SIGNUP_ADMIN,LOGOUT_ADMIN } from "../actions/Admin";

//const initialState = JSON.parse(localStorage.getItem("CodeNet")) || {};
const initialState = {
    admin:{}
}

export default function root(state = initialState, action){
    // console.log('admin',state)
    switch(action.type){
        case LOGIN_ADMIN:
            // console.log(state)
            // console.log(action)
            return {
                ...state,
                admin: action.payload.data
            }
                // localStorage.setItem("CodeNet", JSON.stringify(action.user));
                
            
        // case SIGNUP_ADMIN:
        //     if (action.payload.status === 200)
        //     localStorage.setItem("CodeNet", JSON.stringify(action.user));
    
        //     return action.user;
        
        // case LOGOUT_ADMIN:
        //     case LOG_OUT:
        //     localStorage.removeItem("CodeNet");

        default:
            return state;

    }   
}