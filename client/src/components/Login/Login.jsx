import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logIn } from "../../Redux/actions/Session.js";
import validate from "../../utils/validate.js";
import style from "./Login.module.css";
import { Redirect } from "react-router";

import { FaUserCircle, FaKey } from "react-icons/fa";

export default function Login() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.sessionReducer);

  const [input, setInput] = useState({
    username: process.env.REACT_APP_LOGIN_USERNAME || "",
    password: process.env.REACT_APP_LOGIN_PASSWORD || "",
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

    if (!Object.values(errors).filter((error) => error).length) {
      dispatch(logIn(input));

      setInput({
        username: "",
        password: "",
      });
      setLogged(true);
    } else {
      alert("Usuario o contraseña no validas");
    }
  }

  return logged || session.username ? (
    <Redirect to="/home" />
  ) : (
    <div className={style.container}>
      <img
        src="https://images.pexels.com/photos/1851415/pexels-photo-1851415.jpeg"
        alt=""
      />
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <FaUserCircle />
          <input
            type="text"
            value={input.username}
            name="username"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label>
          <FaKey />
          <input
            type="password"
            value={input.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <div className="f--column">
          <button className="btn" type="submit">
            LogIn
          </button>
          <Link className="btn" to="/signup">
            SignUp
          </Link>
        </div>
      </form>
    </div>
  );
}
