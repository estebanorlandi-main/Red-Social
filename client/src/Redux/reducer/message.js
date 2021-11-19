
import { SET_STATE } from "../actions/Message";

const initialState = {
    untrackmsjs: []
  };
  
  export default function root(state = initialState, action) {
    switch (action.type) {
      
      case SET_STATE:
        const index =  state.untrackmsjs?.findIndex((obj) =>
          obj.conversationId === action.payload.conversationId
        )

        if(index && index !== -1){
          let aux = [...state.untrackmsjs]
          aux[index] = action.payload

          return {
            ...state,
            untrackmsjs: aux
          }

        } else{
          
          return {
            ...state,
            untrackmsjs: [...state.untrackmsjs, action.payload]
          }
        }
  
      default:
        return state;
    }
  }

  // const index =  untrackMessages?.findIndex((obj) =>
        // obj.conversationId === data.conversationId
        // )

        // if(index && index !== -1){
        //   let aux = untrackMessages
        //   aux[index] = data

        //   setUntrackMessages(aux);

        // } else{
        //   setUntrackMessages((prev) => [
        //     ...prev,
        //     {
        //       conversationId: data.conversationId, 
        //       untrack: data.untrack
        //     }
        //   ])
        // }