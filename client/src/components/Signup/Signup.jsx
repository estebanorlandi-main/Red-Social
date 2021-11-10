import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import Select from "react-select";
import { Link } from "react-router-dom";

import { singUp, validateEmail, validateUsername } from "../../Redux/actions/Session.js";
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
    // name: process.env.REACT_APP_NAME || "",
    // lastname: process.env.REACT_APP_LAST_NAME || "",
    // image: process.env.REACT_APP_AVATAR || "",
    email: process.env.REACT_APP_EMAIL || "",
    // gitaccount: process.env.REACT_APP_GITHUB || "",
    // about: process.env.REACT_APP_ABOUT || "",
    // tags: [],
  });

  const [err, setErr] = useState({
    username: "",
    password: "",
    // name: "",
    // lastname: "",
    email: "",
    // gitaccount: "",
    // image: "",
    // about: "",
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

  const handleBlur = async ({ target: { name, value } })=>{
    if(name == "username" && value){
      let username = await dispatch(validateUsername(value))
      if(!username.payload.data.success){
        setErr((old)=>({...old, [name]:username.payload.data.username}))
      }
    }
    if(name == "email" && value){
      let email = await dispatch(validateEmail(value))
      if(!email.payload.data.success){
        setErr((old)=>({...old,[name]:email.payload.data.email}))
      }
    }
  }

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

      // obj.gitaccount = `https://github.com/${obj.gitaccount}`;

      dispatch(singUp(obj));

      setInputs({
        username: "",
        password: "",
        // name: "",
        // lastname: "",
        email: "",
        // gitaccount: "",
        // about: "",
        // tags: "",
      });

      setErr((old) => ({
        username: "",
        password: "",
        // name: "",
        // lastname: "",
        email: "",
        // gitaccount: "",
      }));

      setRegistered(true);
    } else {
      setErr((old) => errors);
    }
  };
  console.log(err)
  return (
    <div className={style.container}>
      {!registered ? (
        <>
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Sign Up</h1>

            {/*<ul className={style.dots}>
              {[1, 2, 3, 4].map((value, i) => (
                <li
                  key={value}
                  onClick={() => setSection(value)}
                  className={`${style.dot} ${
                    value === section ? style.active : ""
                  }`}
                ></li>
              ))}
            </ul>*/}

            {/*
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
            */}
            <section style={{ display: section === 1 ? "block" : "none" }}>
              <label>
                Username
                <div className="input-group">
                  <FaUserCircle />
                  <input
                    onChange={(e) => handleChange(e)}
                    onBlur={(e)=> handleBlur(e)}
                    className={style.input}
                    value={inputs.username}
                    name="username"
                    type="text"
                    placeholder="username"
                  />
                </div>
              </label>
              <span>{err.username}</span>

              <label>
                Email
                <div className="input-group">
                  <MdEmail />
                  <input
                    onChange={(e) => handleChange(e)}
                    onBlur={(e)=> handleBlur(e)}
                    className={style.input}
                    value={inputs.email}
                    name="email"
                    type="email"
                    placeholder="email"
                  />
                </div>
              </label>
              <span>{err.email}</span>

              <label>
                Password
                <div className="input-group">
                  <FaKey />
                  <input
                    onChange={(e) => handleChange(e)}
                    className={style.input}
                    value={inputs.password}
                    name="password"
                    type="password"
                    placeholder="password"
                  />
                </div>
              </label>

              <span>{err.password}</span>
            </section>
            {/*<section style={{ display: section === 2 ? "block" : "none" }}>
              <label>
                Name
                <div className="input-group">
                  <input
                    onChange={(e) => handleChange(e)}
                    className={style.input}
                    value={inputs.name}
                    name="name"
                    type="text"
                    placeholder="name"
                  />
                </div>
              </label>

              <span>{err.name}</span>

              <label>
                Last Name
                <div className="input-group">
                  <input
                    onChange={(e) => handleChange(e)}
                    className={style.input}
                    value={inputs.lastname}
                    name="lastname"
                    type="text"
                    placeholder="lastname"
                  />
                </div>
              </label>
              <span>{err.lastname}</span>
            </section>
            <section style={{ display: section === 3 ? "block" : "none" }}>
              <label>
                Git Account
                <div className="input-group">
                  <input
                    onChange={(e) => handleChange(e)}
                    className={style.input}
                    value={inputs.gitaccount}
                    name="gitaccount"
                    type="text"
                    placeholder="gitaccount"
                  />
                </div>
              </label>
              <span>{err.gitaccount}</span>

              <label>
                Profile Image
                <div className="input-group">
                  <input
                    onChange={(e) => handleChange(e)}
                    className={style.input}
                    value={inputs.image}
                    name="image"
                    type="text"
                    placeholder="image"
                  />
                </div>
              </label>
              <span>{err.image}</span>
            </section>
            <section style={{ display: section === 4 ? "block" : "none" }}>
              <label>
                About
                <div className="input-group">
                  <textarea
                    onChange={(e) => handleChange(e)}
                    className={style.input}
                    value={inputs.about}
                    name="about"
                    type="text"
                    placeholder="about"
                  ></textarea>
                </div>
              </label>
              <span>{err.about}</span>

              <label>
                Technologies
                <Select onChange={handleSelect} options={options} isMulti />
              </label>
            </section>*/}
            <div className="buttonContainer">
              <button className="btn" type="submit" disabled={err.username || err.email || err.password}>
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
