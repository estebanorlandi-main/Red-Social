import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logIn } from "../../Redux/actions/Session.js";
import validate from "../../utils/validate.js";
import style from "./Login.module.css";
import { Redirect } from "react-router";

export default function Login() {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [logged, setLogged] = useState(false);
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value.replaceAll(/^\s+/g, ""),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate(input);
    console.log(errors);

    if (!Object.values(errors).filter((error) => error).length) {
      dispatch(logIn(input));

      setInput({
        username: "",
        email: "",
        password: "",
      });
      setLogged(true);
    } else {
      alert("Usuario o contrasena no validas");
    }
  }

  return (
    <div>
      {logged ? (
        <Redirect to="/home" />
      ) : (
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
            <label>Email</label>
            <input
              type="email"
              value={input.email}
              name="email"
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
          <button type="submit">LogIn</button>
          <hr style={{ margin: "4%" }}></hr>
          <Link to="/signup">SignUp</Link>
        </form>
      )}
    </div>
  );
}
