import { useEffect } from "react";
import { useState } from "react";
import styles from "./Profile.module.css";

export default function Profile(props) {
  const [loading, setLoading] = useState(false);
  const [editButton, setEditButton] = useState(true);
  const [input, setInput] = useState({
    name: "",
    lastname: "",
    mail: "",
    github: "",
    about: "",
    tags: "",
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

  return loading ? (
    <p>loading..</p>
  ) : !editButton ? (
    <div>
      <form action="">
        <input
          name="name"
          value={input.name}
          type="text"
          placeholder="Name.."
          onChange={handleChange}
        />
        {error.name && <p className="danger">{error.name}</p>}
        <input
          name="lastname"
          value={input.lastname}
          type="text"
          placeholder="Lastname.."
          onChange={handleChange}
        />
        {error.lastname && <p className="danger">{error.lastname}</p>}
        <input type="text" placeholder="Mail.." />
        <input type="text" placeholder="Github.." />
        <input type="text" placeholder="About.." />
        <input type="text" placeholder="Tags.." />
        <button type="submit">Save</button>
        <button onClick={() => setEditButton(false)}>Back</button>
      </form>
    </div>
  ) : (
    <div>
      <img
        className={styles.avatar}
        src="http://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png"
      />
      <h2>Name</h2>
      <h2>LastName</h2>
      <h3>Mail</h3>
      <h3>Github</h3>
      <h3>About</h3>
      <h3>Tags</h3>
      <button onClick={() => setEditButton(false)}>Edit</button>
    </div>
  );
}
