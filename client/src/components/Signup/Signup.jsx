import { useState } from "react";
import style from "./Signup.module.css";

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

  const [err, setErr] = useState({
    username: {
      indice: 0,
      errores: [
        "",
        "Este campo es Obligatorio",
        "Solo numeros y letras",
        "Minimo 1 letra",
        "Minimo 1 numero",
        "Minimo 3 caracteres",
        "Maximo 16 caracteres",
        "Este nombre de usuario ya existe",
      ],
    },
    password: {
      indice: 0,
      errores: [
        "",
        "Este campo es Obligatorio",
        "Solo numeros y letras",
        "Minimo 1 letra",
        "Minimo 1 numero",
        "Minimo 8 caracteres",
        "Maximo 16 caracteres",
      ],
    },
    name: {
      indice: 0,
      errores: ["", "Este campo es Obligatorio", "Solo letras"],
    },
    lastName: {
      indice: 0,
      errores: ["", "Este campo es Obligatorio", "Solo letras"],
    },
    email: { indice: 0, errores: ["", "Este campo es Obligatorio"] },
    github: {
      indice: 0,
      errores: [
        "",
        "Este campo es Obligatorio",
        "Este usuario de github no existe",
      ],
    },
  });

  function validarUsername(str) {
    if (inputs.username.length < 3) {
      return { num: 5, bol: false };
    }
    if (inputs.username.length > 16) {
      return { num: 6, bol: false };
    }
    if (!tieneLet(str)) {
      return { num: 3, bol: false };
    }
    if (!tieneNum(str)) {
      return { num: 4, bol: false };
    }
    if (tieneSimb(str)) {
      return { num: 2, bol: false };
    }
    //  if () {
    //    return 7
    //  }
    return { num: 0, bol: true };
  }

  function validarPassword(str) {
    if (inputs.password.length < 8) {
      return { num: 5, bol: false };
    }
    if (inputs.password.length > 16) {
      return { num: 6, bol: false };
    }
    if (!tieneLet(str)) {
      return { num: 3, bol: false };
    }
    if (!tieneNum(str)) {
      return { num: 4, bol: false };
    }
    if (tieneSimb(str)) {
      return { num: 2, bol: false };
    }
    return { num: 0, bol: true };
  }

  function validarNombreyApellido(str) {
    if (tieneNum(str) || tieneSimb(str)) {
      return { num: 2, bol: false };
    } else return { num: 0, bol: true };
  }

  function validar() {
    var arr = [];
    let validar = [];
    for (var propiedad in inputs) {
      if (!inputs[propiedad].length) {
        arr.push(propiedad);
      }
    }

    if (arr.length) {
      arr.forEach((i) => {
        if (i === "about" || i === "tags") {
          return;
        }
        validar.push(false);
        setErr((obj) => {
          return { ...obj, [i]: { ...obj[i], indice: 1 } };
        });
      });
    }

    if (!arr.includes("username")) {
      let indice = validarUsername("username");
      validar.push(indice.bol);
      setErr((old) => ({
        ...old,
        username: { ...old.username, indice: indice.num },
      }));
    }

    if (!arr.includes("password")) {
      let indice = validarPassword("password");
      validar.push(indice.bol);
      setErr((old) => ({
        ...old,
        password: { ...old.password, indice: indice.num },
      }));
    }

    if (!arr.includes("name")) {
      let indice = validarNombreyApellido("name");
      validar.push(indice.bol);
      setErr((old) => ({
        ...old,
        name: { ...old.name, indice: indice.num },
      }));
    }
    if (!arr.includes("lastName")) {
      let indice = validarNombreyApellido("lastName");
      validar.push(indice.bol);
      setErr((old) => ({
        ...old,
        lastName: { ...old.lastName, indice: indice.num },
      }));
    }
    return validar;
  }

  function tieneNum(str) {
    let regexnumeros = /([0-9]+)/;
    if (regexnumeros.test(inputs[str])) {
      return true;
    }
    return false;
  }

  function tieneLet(str) {
    let regexletrasmin = /([a-z]+)/;
    let regexletrasmay = /([A-Z]+)/;
    if (regexletrasmay.test(inputs[str]) || regexletrasmin.test(inputs[str])) {
      return true;
    }
    return false;
  }

  function tieneSimb(str) {
    let regexFinal1 = /([\W])/;
    let regexFinal2 = /[_]/;
    if (regexFinal1.test(inputs[str]) || regexFinal2.test(inputs[str])) {
      return true;
    }
    return false;
  }

  const handleChange = (e) => {
    setInputs((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
    setErr((old) => ({
      ...old,
      [e.target.name]: { ...old[e.target.name], indice: 0 },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validacion = validar();
    if (!validacion.includes(false)) {
      console.log("aca se haria la llamada a la action");
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
    }
  };

  return (
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
      <div className={style.errores}>
        {err.username.errores[err.username.indice]}
      </div>
      <label>Password</label>
      <input
        className={style.input}
        value={inputs.password}
        name="password"
        type="password"
      />
      <div className={style.errores}>
        {err.password.errores[err.password.indice]}
      </div>
      <label>Name</label>
      <input
        className={style.input}
        value={inputs.name}
        name="name"
        type="text"
      />
      <div className={style.errores}>{err.name.errores[err.name.indice]}</div>
      <label>Last Name</label>
      <input
        className={style.input}
        value={inputs.lastName}
        name="lastName"
        type="text"
      />
      <div className={style.errores}>
        {err.lastName.errores[err.lastName.indice]}
      </div>
      <label>Email</label>
      <input
        className={style.input}
        value={inputs.email}
        name="email"
        type="email"
      />
      <div className={style.errores}>{err.email.errores[err.email.indice]}</div>
      <label>GitHub</label>
      <input
        className={style.input}
        value={inputs.github}
        name="github"
        type="text"
      />
      <div className={style.errores}>
        {err.github.errores[err.github.indice]}
      </div>
      <label>Avatar</label>
      <input
        className={style.input}
        value={inputs.avatar}
        name="avatar"
        type="image"
      />
      <label>About</label>
      <textarea
        className={style.input}
        value={inputs.about}
        name="about"
        type="text"
      ></textarea>
      <label>Tags</label>
      <input
        className={style.input}
        value={inputs.tags}
        name="tags"
        type="text"
      />
      <button type="submit">Crear</button>
    </form>
  );
}

export default Signup;
