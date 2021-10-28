import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Profile.module.css";
import "./Profile.css";

export default function Profile(props) {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const users = useSelector((state) => state.users);
  const [input, setInput] = useState({
    username: users[0].username,
    firstname: users[0].firstName,
    lastname: users[0].lastName,
    mail: users[0].email,
    github: users[0].github,
    about: users[0].about,
    tags: users[0].tags.map((tag) => tag),
  });
  const [error, setError] = useState({ name: "", lastname: "" });

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    validate(event);
  };

  const validate = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      if (value.length === 0) setError({ ...error, name: "Name is required." });
      else setError({ ...error, name: "" });
    } else if (name === "lastname") {
      if (value.length === 0)
        setError({ ...error, lastname: "Lastname is required." });
      else setError({ ...error, lastname: "" });
    }
  };

  const handleSubmit = () => {
    // users = {
    //   ...users,
    //   username: input.username,
    //   firstName: input.firstname,
    //   lastName: input.lastname,
    //   email: input.mail,
    //   github: input.github,
    //   about: input.about,
    // };

    users[0] = {
      ...users[0],
      firstName: input.firstname,
      lastName: input.lastname,
      email: input.mail,
      github: input.github,
      about: input.about,
    };

    console.log(users[0]);
  };

  return loading ? (
    <p>loading..</p>
  ) : loggedIn ? (
    <div>
      <div className="container">
        <div className="main">
          <div class="topbar"></div>
          <div class="row">
            <div class="col-md-4 mt-1">
              <div class="card text-center sidebar">
                <div class="card-body">
                  <img class="rounded-circle" src={users[0].avatar} />
                  <div class="mt-3">
                    <h3>{users[0].username}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 mt-1">
              <div class="card mb-3 content">
                <h1 class="m-3 pt-3">
                  <input
                    className={styles.inputFullName}
                    name="firstname"
                    value={input.firstname}
                    type="text"
                    placeholder="First name.."
                    onChange={handleChange}
                  />
                  <input
                    className={styles.inputFullName}
                    name="lastname"
                    value={input.lastname}
                    type="text"
                    placeholder="Last name.."
                    onChange={handleChange}
                  />
                </h1>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-2">
                      <h5>Email</h5>
                    </div>
                    <div class="col-md-9 text-secondary">{users[0].email}</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <h5>Github</h5>
                  </div>
                  <div class="col-md-9 text-secondary">{users[0].github}</div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <h3>About</h3>
                  </div>
                  <div class="col-md-9 text-secondary">
                    <textarea
                      name="about"
                      value={input.about}
                      type="text"
                      placeholder="About.."
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <h5>Tags</h5>
                  </div>
                  <div class="col-md-9 text-secondary">
                    <select>
                      <option selected disabled>
                        Tags..
                      </option>
                      {users[1].tags.map((tag) => (
                        <option>{tag}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => handleSubmit()}>Save</button>
      <button onClick={() => setLoggedIn(false)}>Log Out</button>
    </div>
  ) : (
    <div>
      <div className="container">
        <div className="main">
          <div class="topbar"></div>
          <div class="row">
            <div class="col-md-4 mt-1">
              <div class="card text-center sidebar">
                <div class="card-body">
                  <img class="rounded-circle" src={users[0].avatar} />
                  <div class="mt-3">
                    <h3>{users[0].username}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 mt-1">
              <div class="card mb-3 content">
                <h1 class="m-3 pt-3">
                  {users[0].firstName} {users[0].lastName}
                </h1>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-2">
                      <h5>Email</h5>
                    </div>
                    <div class="col-md-9 text-secondary">{users[0].email}</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <h5>Github</h5>
                  </div>
                  <div class="col-md-9 text-secondary">{users[0].github}</div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <h3>About</h3>
                  </div>
                  <div class="col-md-9 text-secondary">{users[0].about}</div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <h5>Tags</h5>
                  </div>
                  <div class="col-md-9 text-secondary">
                    {users[0].tags.map((tag) => tag)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setLoggedIn(true)}>Log In</button>
    </div>
  );
}
