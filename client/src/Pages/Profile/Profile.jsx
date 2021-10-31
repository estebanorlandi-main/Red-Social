import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Profile.module.css";

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

  return (
    <div className={styles.container}>
      <img src={users[0].avatar} alt="avatar" />

      <h3>{users[0].username}</h3>
      {loggedIn ? (
        <input
          name="firstname"
          onChange={handleChange}
          value={input.firstname}
          type="text"
          placeholder="First name.."
        />
      ) : (
        users[0].firstName
      )}

      {loggedIn ? (
        <input
          name="lastname"
          value={input.lastname}
          type="text"
          placeholder="Last name.."
          onChange={handleChange}
        />
      ) : (
        users[0].lastName
      )}

      <h5>Email</h5>
      <div>{users[0].email}</div>

      <h5>Github</h5>
      <div>{users[0].github}</div>

      <h3>About</h3>
      {loggedIn ? (
        <textarea
          name="about"
          value={input.about}
          type="text"
          placeholder="About.."
          onChange={handleChange}
        />
      ) : (
        users[0].about
      )}

      <h5>Tags</h5>
      {loggedIn ? (
        <select>
          <option selected>Tags..</option>
          {users[1].tags.map((tag) => (
            <option>{tag}</option>
          ))}
        </select>
      ) : (
        ""
      )}

      {loggedIn ? (
        <button onClick={() => setLoggedIn(true)}>Log In</button>
      ) : (
        <Fragment>
          <button onClick={() => handleSubmit()}>Save</button>
          <button onClick={() => setLoggedIn(false)}>Log Out</button>
        </Fragment>
      )}
    </div>
  );
}
