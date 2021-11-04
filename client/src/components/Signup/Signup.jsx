import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import Select from "react-select";

import { singUp } from "../../Redux/actions/Session.js";
import validate from "../../utils/validate";

import style from "./Signup.module.css";

function Signup(props) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    username: process.env.REACT_APP_USERNAME || "",
    password: process.env.REACT_APP_PASSWORD || "",
    name: process.env.REACT_APP_NAME || "",
    lastname: process.env.REACT_APP_LAST_NAME || "",
    image: process.env.REACT_APP_AVATAR || "",
    email: process.env.REACT_APP_EMAIL || "",
    gitaccount: process.env.REACT_APP_GITHUB || "",
    about: process.env.REACT_APP_ABOUT || "",
    tags: [],
  });

  const [err, setErr] = useState({
    username: "",
    password: "",
    name: "",
    lastname: "",
    email: "",
    gitaccount: "",
  });

  const [registered, setRegistered] = useState(false);

  const options = [
    { value: "js", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "cpp", label: "C++" },
    { value: "php", label: "PHP" },
    { value: "java", label: "Java" },
    { value: "c", label: "C" },
    { value: "go", label: "Go" },
    { value: "kotlin", label: "Kotiln" },
    { value: "sql", label: "SQL" },
    { value: "mongodb", label: "MongoDB" },
    { value: "postgresql", label: "PostgreSQL" },
  ];

  const handleChange = ({ target: { name, value } }) => {
    setInputs((old) => ({ ...old, [name]: value }));
    setErr((old) => ({ ...old, [name]: validate(name, value) }));
  };

  const handleSelect = (e) => {
    setInputs((old) => ({ ...old, tags: e.map((option) => option.value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(inputs);

    if (!Object.values(errors).filter((error) => error).length) {
      let obj = inputs;

      if (obj.image === "")
        obj.image = "https://cdn-icons-png.flaticon.com/512/147/147144.png";

      obj.gitaccount = `https://github.com/${obj.gitaccount}`;

      dispatch(singUp(obj));

      setInputs({
        username: "",
        password: "",
        name: "",
        lastname: "",
        email: "",
        gitaccount: "",
        about: "",
        tags: "",
      });

      setErr((old) => ({
        username: "",
        password: "",
        name: "",
        lastname: "",
        email: "",
        gitaccount: "",
      }));

      setRegistered(true);
    } else {
      setErr((old) => errors);
    }
  };

  return (
    <div>
      {!registered ? (
        <form className={style.container} onSubmit={(e) => handleSubmit(e)}>
          Formulario de registro
          <label>Username</label>
          <input
            onChange={(e) => handleChange(e)}
            className={style.input}
            value={inputs.username}
            name="username"
            type="text"
          />
          <div className={style.errores}>{err.username}</div>
          <label>Password</label>
          <input
            onChange={(e) => handleChange(e)}
            className={style.input}
            value={inputs.password}
            name="password"
            type="password"
          />
          <div className={style.errores}>{err.password}</div>
          <label>Name</label>
          <input
            onChange={(e) => handleChange(e)}
            className={style.input}
            value={inputs.name}
            name="name"
            type="text"
          />
          <div className={style.errores}>{err.name}</div>
          <label>Last Name</label>
          <input
            onChange={(e) => handleChange(e)}
            className={style.input}
            value={inputs.lastname}
            name="lastname"
            type="text"
          />
          <div className={style.errores}>{err.lastname}</div>
          <label>Email</label>
          <input
            onChange={(e) => handleChange(e)}
            className={style.input}
            value={inputs.email}
            name="email"
            type="email"
          />
          <div className={style.errores}>{err.email}</div>
          <label>GitHub</label>
          <input
            onChange={(e) => handleChange(e)}
            className={style.input}
            value={inputs.gitaccount}
            name="gitaccount"
            type="text"
          />
          <div className={style.errores}>{err.gitaccount}</div>
          <label>Avatar</label>
          <input
            onChange={(e) => handleChange(e)}
            className={style.input}
            value={inputs.image}
            name="image"
            type="text"
          />
          <label>About</label>
          <textarea
            onChange={(e) => handleChange(e)}
            className={style.input}
            value={inputs.about}
            name="about"
            type="text"
          ></textarea>
          <label>Tags</label>
          <Select onChange={handleSelect} options={options} isMulti />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <Redirect to="/home" />
      )}
    </div>
  );
}

export default Signup;
