import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from "./styless.css"
import { Link } from "react-router-dom";
import { loginAdmin } from "../../Redux/actions/Admin";
import validate from "../../utils/validate.js";
import { Redirect } from "react-router";

export default function AdminLogin(){
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        username: "",
        password:"",
        title:""});
    
    const [logged, setLogged] = useState(false);
    
    const handleChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value.replaceAll(/^\s+/g, ""),
          });
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const errors = validate(input);
        
        if (!Object.values(errors).filter((error) => error).length) {
            dispatch(loginAdmin(input));
      
            setInput({
              username: "",
              password: "",
              title:""
            });
            setLogged(true);
          } else {
            alert("Usuario o contrasena no validas");
          }
    }
    return(
        <div>{
          logged ? (
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