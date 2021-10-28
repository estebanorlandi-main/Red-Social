import { useState } from "react";
import style from "./Signup.module.css"

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
    username: {indice:0, errores:["","Este campo es Obligatorio", "Solo numeros y letras", "Minimo 1 letra", "Minimo 1 numero", "Minimo 3 caracteres", "Maximo 16 caracteres","Este nombre de usuario ya existe"]},
    password: {indice:0, errores:["","Este campo es Obligatorio", "Solo numeros y letras", "Minimo 1 letra", "Minimo 1 numero", "Minimo 8 caracteres", "Maximo 16 caracteres"]},
    name: {indice:0, errores:["","Este campo es Obligatorio", "Solo letras"]},
    lastName: {indice:0, errores:["","Este campo es Obligatorio", "Solo letras"]},
    email: {indice:0, errores:["","Este campo es Obligatorio"]},
    github: {indice:0, errores:["","Este campo es Obligatorio","Este usuario de github no existe"]}
  })

  function validarUsername(str){
    if (inputs.username.length < 3) {
      return 5
    }
    if (inputs.username.length > 16) {
      return 6
    }
    if (tieneLet(str)) {
      return 3
    }
    if (tieneNum(str)) {
      return 4
    }
    if (tieneSimb(str)) {
      return 2
    }
  //  if () {
  //    return 7
  //  }
    return true
  }

  function validarPassword(str){

    if (inputs.password.length < 8) {
      return 5
    }
    if (inputs.password.length > 16) {
      return 6
    }
    if (tieneLet(str)) {
      return 3
    }
    if (tieneNum(str)) {
      return 4
    }
    if (tieneSimb(str)) {
      return 2
    }
    return true
  }

  function validarNombreyApellido(str){
    if (tieneNum(str) || tieneSimb(str)) {
      return 2
    }
  }

  function validar(){
    var arr = [];
    for (var propiedad in inputs) {
      if (!inputs[propiedad].length) {
        arr.push(propiedad)
      }
    }

    if (arr.length) {
      console.log(err[arr[0]].indice)
      arr.forEach((i) => {
        if (i==="about" || i==="tags") {
          return
        }
        setErr(obj=>{
          return {...obj, [i]:{...obj[i], indice:1}}
        });
    })
  }

  if (!arr.includes("username")) {
    console.log()
    setErr((old) => ({
      ...old,
      username:{...old.username, indice:validarUsername("username")}
    }))
  }

  if (!arr.includes("password")) {
    setErr((old) => ({
      ...old,
      password:{...old.password, indice:validarPassword("password")}
    }))
  }

  if (!arr.includes("name")) {
      setErr((old) => ({
        ...old,
        name:{...old.name, indice:validarNombreyApellido("name")}
      }))
  }
  if (!arr.includes("lastName")) {
    setErr((old) => ({
      ...old,
      lastName:{...old.lastName, indice:validarNombreyApellido("lastName")}
    }))
  }
}

function tieneNum(str){
  let regexnumeros = /([0-9]+)/
  if (!regexnumeros.test(inputs[str])) {
    return true
  }
  return false
}
function tieneLet(str){
  let regexletrasmin = /([a-z]+)/
  let regexletrasmay = /([A-Z]+)/
  if (!regexletrasmay.test(inputs[str]) && !regexletrasmin.test(inputs[str])) {
    return true
  }
  return false
}
function tieneSimb(str){
  let regexFinal1 = /([\W])/
  let regexFinal2 = /[_]/
  if (regexFinal1.test(inputs[str]) || regexFinal2.test(inputs[str])) {
    return true
  }
  return false
}
  const handleChange = (e) => {
    setInputs((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
    setErr((old) => ({
      ...old,
      [e.target.name]: {...old[e.target.name], indice:0}
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validar()
  };

  return (
    <form className={style.container} onSubmit={(e)=>handleSubmit(e)} onChange={(e)=>handleChange(e)}>
      Formulario de registro
      <label>
        Username
      </label>
        <input className={style.input}  name="username" type="text" />
        <div>{err.username.errores[err.username.indice]}</div>
      <label>
        Password
      </label>
        <input className={style.input} name="password" type="password" />
        <div>{err.password.errores[err.password.indice]}</div>
      <label>
        Name
      </label>
        <input className={style.input} name="name" type="text" />
        <div>{err.name.errores[err.name.indice]}</div>
      <label>
        Last Name
      </label>
        <input className={style.input} name="lastName" type="text" />
        <div>{err.lastName.errores[err.lastName.indice]}</div>
      <label>
        Email
      </label>
        <input className={style.input} name="email" type="email" />
        <div>{err.email.errores[err.email.indice]}</div>
      <label>
        GitHub
      </label>
        <input className={style.input} name="github" type="text" />
        <div>{err.github.errores[err.github.indice]}</div>
      <label>
        Avatar
      </label>
        <input className={style.input} name="avatar" type="image" />
      <label>
        About
      </label>
        <textarea className={style.input} name="about" type="text"></textarea>
      <label>
        Tags
      </label>
        <input className={style.input} name="tags" type="text" />
        <button type="submit">Crear</button>
    </form>
  );
}

export default Signup;
