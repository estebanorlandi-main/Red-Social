import { GET_SUPPORT_MESSAGE,DELETE_MESSAGE_SUPPORT } from "../actions/Support";

const initialState = {
    messageSupport:{}
}

export default function root(state = initialState, action){
    switch (action.type){
        case GET_SUPPORT_MESSAGE:    
            return{
                ...state,
                messageSupport :action.payload
            }
        case DELETE_MESSAGE_SUPPORT:
            return{
                ...state,
                messageSupport :action.payload
            }
        default:
            return state;
    }
}