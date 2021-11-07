import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import Select from "react-select";
import { Link } from "react-router-dom";

import { singUp } from "../../Redux/actions/Session.js";
import validate from "../../utils/validate";

import { MdEmail } from "react-icons/md";
import { FaKey, FaUserCircle } from "react-icons/fa";

import style from "./Signup.module.css";

function Signup(props) {
  const dispatch = useDispatch();
  const [section, setSection] = useState(1);

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
    image: "",
    about: "",
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

  const handleSection = () => setSection((old) => (old < 5 ? ++old : old));

  return (
    <div className={style.container}>
      {!registered ? (
        <>
          <img
            src="https://images.pexels.com/photos/1851415/pexels-photo-1851415.jpeg"
            alt=""
          />
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <button
                type="button"
                onClick={() => setSection((old) => (old > 1 ? --old : old))}
              >
                prev
              </button>
              <button
                type="button"
                onClick={() => setSection((old) => (old < 4 ? ++old : old))}
              >
                next
              </button>
            </div>

            <section style={{ display: section === 1 ? "block" : "none" }}>
              <label>
                <FaUserCircle />
                <input
                  onChange={(e) => handleChange(e)}
                  className={style.input}
                  value={inputs.username}
                  name="username"
                  type="text"
                  placeholder="username"
                />
              </label>
              <span>{err.username}</span>

              <label>
                <MdEmail />
                <input
                  onChange={(e) => handleChange(e)}
                  className={style.input}
                  value={inputs.email}
                  name="email"
                  type="email"
                  placeholder="email"
                />
              </label>
              <span>{err.email}</span>

              <label>
                <FaKey />
                <input
                  onChange={(e) => handleChange(e)}
                  className={style.input}
                  value={inputs.password}
                  name="password"
                  type="password"
                  placeholder="password"
                />
              </label>
              <span>{err.password}</span>
            </section>

            <section style={{ display: section === 2 ? "block" : "none" }}>
              <label>
                <input
                  onChange={(e) => handleChange(e)}
                  className={style.input}
                  value={inputs.name}
                  name="name"
                  type="text"
                  placeholder="name"
                />
              </label>
              <span>{err.name}</span>

              <label>
                <input
                  onChange={(e) => handleChange(e)}
                  className={style.input}
                  value={inputs.lastname}
                  name="lastname"
                  type="text"
                  placeholder="lastname"
                />
              </label>
              <span>{err.lastname}</span>
            </section>

            <section style={{ display: section === 3 ? "block" : "none" }}>
              <label>
                <input
                  onChange={(e) => handleChange(e)}
                  className={style.input}
                  value={inputs.gitaccount}
                  name="gitaccount"
                  type="text"
                  placeholder="gitaccount"
                />
              </label>
              <span>{err.gitaccount}</span>

              <label>
                <input
                  onChange={(e) => handleChange(e)}
                  className={style.input}
                  value={inputs.image}
                  name="image"
                  type="text"
                  placeholder="image"
                />
              </label>
              <span>{err.image}</span>
            </section>

            <section style={{ display: section === 4 ? "block" : "none" }}>
              <label>
                <textarea
                  onChange={(e) => handleChange(e)}
                  className={style.input}
                  value={inputs.about}
                  name="about"
                  type="text"
                  placeholder="about"
                ></textarea>
              </label>
              <span>{err.about}</span>

              <label>
                <Select onChange={handleSelect} options={options} isMulti />
              </label>
            </section>

            <div className="buttonContainer">
              <button className="btn" type="submit">
                SignUp
              </button>
              <Link className="btn" to="/login">
                LogIn
              </Link>
            </div>
          </form>
        </>
      ) : (
        <Redirect to="/home" />
      )}
    </div>
  );
}

export default Signup;
