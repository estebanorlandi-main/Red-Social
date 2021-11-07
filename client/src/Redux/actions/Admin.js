import axios from "axios";

export const SIGNUP_ADMIN = "signup_admin";
export const LOGIN_ADMIN = "login_admin";
export const LOGOUT_ADMIN = "logOut_admin"

export function sidnupAdmin(admin){
    return (dispatch)=>
        axios   
            .post(`http://localhost:3001/login/register/privileges`, admin)
            .then((res) => dispatch({type: SIGNUP_ADMIN, payload: res, admin}))
            .catch((e) => console.log("Error in sigup admin",e))
}

export function loginAdmin(admin){
    return (dispatch) =>
        axios   
            .post(`http://localhost:3001/login/`,admin)
            .then((res) => dispatch({type: LOGIN_ADMIN, payload:res}))
            .catch((e) =>
                console.log('Error in authentication admin ',e),
                alert("Error your not admin")
            )
}

export function logOutAdmin(){
    return { type: LOGOUT_ADMIN, payload: {} };
}