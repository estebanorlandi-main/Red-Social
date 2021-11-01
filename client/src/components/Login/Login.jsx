import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {LogIn} from "../../Redux/actions/Profile.js"
import style from "./Login.module.css";
import {Redirect} from "react-router"

export default function Login() {
  const dispatch = useDispatch();
  const usuarios = useSelector(store=> store.usersReducer.users)

  const [input, setInput] = useState({
    name: "",
    password: "",
  });

  const [logged, setLogged] = useState(false)
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value.replaceAll(/^\s+/g, ""),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let arr = usuarios.filter((usuario)=> usuario.username === input.name && usuario.password === input.password)
    if(arr.length !== 0){
      dispatch(LogIn(arr[0]))
      setInput({
        name: "",
        password: "",
      });
      setLogged(true)
    }else {
      alert("Usuario o contrasena no validas")
    }
  }

  function handleClick(e) {
    e.preventDefault();
  }

  return (
    <div>
    {logged ? <Redirect to="/home"/>:
      <form className={style.container} onSubmit={(e) => handleSubmit(e)}>
        <div className={style.label}>
          <label>Name</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={style.label}>
          <label>Password</label>
          <input
            type="text"
            value={input.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">LogIn</button>
        <hr style={{ margin: "4%" }}></hr>
        <Link to="/signup">SignUp</Link>
      </form>}
    </div>

  );
}
