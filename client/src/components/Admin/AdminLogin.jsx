import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./styless.css"
import { Link } from "react-router-dom";
import { loginAdmin } from "../../Redux/actions/Admin";
import validate from "../../utils/validate.js";
import { Redirect } from "react-router";

export default function AdminLogin(){
    const dispatch = useDispatch();
    // var [flags, setFlags]= useState(true)
    const [input, setInput] = useState({
      username: "",
      password:"",
      title:""});
      var admin = useSelector(state => state.adminReducer)
      
      const [error, setError] = useState({});
      // useEffect(()=>{
      //   console.log('Entra')
      //   dispatch(loginAdmin(input));
      // },)
    console.log(admin)
    const handleChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value.replaceAll(/^\s+/g, ""),
          });
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        const errors = validate(input);
        if (Object.values(errors).filter((error) => error).length) {
            alert("Usuario o contrasena no validas");
          }else{ 
            setError({message:"Error your not admin"})
            dispatch(loginAdmin(input));
        }        
      }
   
    return(
        <div>{
          
          admin.admin === true ? (
            <Redirect to="/supportAdmin"/>
          ):(
            <form className={style.container} onSubmit={(e) => handleSubmit(e)}>
          <div className={style.label}>
            <label>Username</label>
            <input
              type="text"
              value={input.username}
              name="username"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={style.label}>
            <label>Title</label>
            <input
              type="text"
              value={input.title}
              name="title"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={style.label}>
            <label>Password</label>
            <input
              type="password"
              value={input.password}
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          
          <button type="submit">Login</button>
          <hr style={{ margin: "4%" }}></hr>
          <Link to="/signup">SignUpLogin</Link>
        </form>
          )
        }
        </div>
    )
}