import { GET_SUPPORT_MESSAGE } from "../actions/Support";

const initialState = {
    messageSupport:{}
}

export default function root(state = initialState, action){
    switch (action.type){
        case GET_SUPPORT_MESSAGE:
            console.log(action.payload)
        return{
                ...state,
                messageSupport :action.payload
            }
        default:
            return state;
    }
}