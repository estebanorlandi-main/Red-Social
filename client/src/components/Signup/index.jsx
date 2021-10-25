import { useState } from "react";

function Signup(props) {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    name: "",
    lastName: "",
    email: "",
    github: "",
    about: "",
    tags: "",
  });

  const handleChange = (e) => {
    setInputs((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      Formulario de registro
      <label>
        Username
        <input name="username" type="text" />
      </label>
      <label>
        Password
        <input type="password" />
      </label>
      <label>
        Name
        <input type="text" />
      </label>
      <label>
        Last Name
        <input type="text" />
      </label>
      <label>
        Email
        <input type="email" />
      </label>
      <label>
        GitHub
        <input type="text" />
      </label>
      <label>
        Avatar
        <input type="image" />
      </label>
      <label>
        About
        <textarea type="text"></textarea>
      </label>
      <label>
        Tags
        <input type="text" />
      </label>
    </form>
  );
}

export default Signup;
