import axios from "axios";
export const GET_SUPPORT_MESSAGE = "get_support_message"

export function createSupport(payload){
    return async function(dispatch){
        const data = await axios.post("http://localhost:3001/support",payload)
        return data;
    }
}

export function getSupport(){
    return (dispatch) =>
    axios
      .get(`http://localhost:3001/support`)
      .then((res) => dispatch({ type: GET_SUPPORT_MESSAGE, payload: res.data } ));
     

}