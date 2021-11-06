import axios from "axios";

export function createSupport(payload){
    return async function(dispatch){
        const data = await axios.post("http://localhost:3001/support",payload,{withCredentials:true})
        return data;
    }
}
