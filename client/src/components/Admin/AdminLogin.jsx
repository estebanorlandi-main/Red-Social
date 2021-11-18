import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./AdminLogin.module.css";
import { Link } from "react-router-dom";
import { loginAdmin } from "../../Redux/actions/Admin";
import validate from "../../utils/validate.js";
import { Redirect } from "react-router";
import { FaUserCircle, FaKey } from "react-icons/fa";

export default function AdminLogin() {
  const dispatch = useDispatch();
  // var [flags, setFlags]= useState(true)
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  var admin = useSelector((state) => state.adminReducer);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value.replaceAll(/^\s+/g, ""),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(input);
    if (Object.values(errors).filter((error) => error).length) {
      console.log("Usuario o contrasena no validas");
    } else {
      dispatch(loginAdmin(input));
    }
  };

  return admin.admin === true ? (
    <Redirect to="/homeAdmin" />
  )  : (
    <div className={style.container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Log In Admin</h1>
        <label>
          Username
          <div className="input-group">
            <FaUserCircle />
            <input
            type="text"
            value={input.username}
            name="username"
            onChange={(e) => handleChange(e)}
            placeholder="Enter username"
            />            
          </div>
        </label>
        <label>
          Password
          <div className="input-group">
            <FaKey/>
            <input
            type="password"
            value={input.password}
            name="password"
            onChange={(e) => handleChange(e)}
            placeholder="Enter password"
            />            
          </div>
        </label>
        <div className="buttonContainer">
          <button className="btn" type="submit">Login</button>
          <Link className="btn" to="/signup">SignUp Login</Link>          
        </div>
      </form>    
    </div>
      )
  ;
}

