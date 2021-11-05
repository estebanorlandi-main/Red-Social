import { GET_SUPPORT_MESSAGE } from "../actions/Support";

const initialState = {
    messageSupport=[]
}

export default function root(state = initialState, action){
    console.log('Tu viaja')
    switch (action.type){
        case GET_SUPPORT_MESSAGE:
        console.log('Entra',action.payload)    
        return{
                ...state,
                messageSupport :[...state.messageSupport, ...action.payload]
            }
        default:
            return state;
    }
}