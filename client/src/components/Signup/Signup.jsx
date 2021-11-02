import { useState } from "react";
import style from "./Signup.module.css";
import { SingUp } from "../../Redux/actions/Profile.js";
import { addUser } from "../../Redux/actions/Users.js";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import Select from "react-select";
import validate from "../../utils/validate";

function Signup(props) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    name: "",
    lastName: "",
    avatar:"",
    email: "",
    github: "",
    about: "",
    tags: "",
  });

  const [err, setErr] = useState({
    username: "",
    password: "",
    name: "",
    lastName: "",
    email: "",
    github: "",
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
      let obj = inputs
      if (obj.avatar === "") {
        obj.avatar = "https://cdn-icons-png.flaticon.com/512/147/147144.png"
      }
      dispatch(SingUp(obj));
      dispatch(addUser(obj));

      setInputs({
        username: "",
        password: "",
        name: "",
        lastName: "",
        email: "",
        github: "",
        about: "",
        tags: "",
      });

      setErr((old) => ({
        username: "",
        password: "",
        name: "",
        lastName: "",
        email: "",
        github: "",
      }));

      setRegistered(true);
    } else {
      setErr((old) => errors);
    }
  };

  return (
    <div>
      {!registered ? (
        <form
          className={style.container}
          onSubmit={(e) => handleSubmit(e)}
          onChange={(e) => handleChange(e)}
        >
          Formulario de registro
          <label>Username</label>
          <input
            className={style.input}
            value={inputs.username}
            name="username"
            type="text"
          />
          <div className={style.errores}>{err.username}</div>
          <label>Password</label>
          <input
            className={style.input}
            value={inputs.password}
            name="password"
            type="password"
          />
          <div className={style.errores}>{err.password}</div>
          <label>Name</label>
          <input
            className={style.input}
            value={inputs.name}
            name="name"
            type="text"
          />
          <div className={style.errores}>{err.name}</div>
          <label>Last Name</label>
          <input
            className={style.input}
            value={inputs.lastName}
            name="lastName"
            type="text"
          />
          <div className={style.errores}>{err.lastName}</div>
          <label>Email</label>
          <input
            className={style.input}
            value={inputs.email}
            name="email"
            type="email"
          />
          <div className={style.errores}>{err.email}</div>
          <label>GitHub</label>
          <input
            className={style.input}
            value={inputs.github}
            name="github"
            type="text"
          />
          <div className={style.errores}>{err.github}</div>
          <label>Avatar</label>
          <input
            className={style.input}
            value={inputs.avatar}
            name="avatar"
            type="text"
          />
          <label>About</label>
          <textarea
            className={style.input}
            value={inputs.about}
            name="about"
            type="text"
          ></textarea>
          <label>Tags</label>
          <Select
            onChange={handleSelect}
            options={options}
            isMulti
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <Redirect to="/home" />
      )}
    </div>
  );
}

export default Signup;
