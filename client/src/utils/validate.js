export function tieneNum(str) {
  let regexnumeros = /([0-9]+)/;
  if (regexnumeros.test(str)) {
    return true;
  }
  return false;
}

export function tieneLet(str) {
  let regexletrasmin = /([a-z]+)/;
  let regexletrasmay = /([A-Z]+)/;
  if (regexletrasmay.test(str) || regexletrasmin.test(str)) {
    return true;
  }
  return false;
}

export function tieneSimb(str) {
  let regexFinal1 = /([\W])/;
  let regexFinal2 = /[_]/;
  if (regexFinal1.test(str) || regexFinal2.test(str)) {
    return true;
  }
  return false;
}

export function validarUsername(str) {
  const errType = [
    "",
    "Este campo es Obligatorio",
    "Solo numeros y letras",
    "Minimo 1 letra",
    "Minimo 1 numero",
    "Minimo 3 caracteres",
    "Maximo 16 caracteres",
    "Este nombre de usuario ya existe",
  ];

  if (!str.length) return errType[1];
  if (str.length < 3) return errType[5];
  if (str.length > 16) return errType[6];
  if (!tieneLet(str)) return errType[3];
  if (!tieneNum(str)) return errType[4];
  if (tieneSimb(str)) return errType[2];
  //if (existe()) return errType[7];

  return errType[0];
}

export function validarPassword(str) {
  const errType = [
    "",
    "Este campo es Obligatorio",
    "Solo numeros y letras",
    "Minimo 1 letra",
    "Minimo 1 numero",
    "Minimo 8 caracteres",
    "Maximo 16 caracteres",
  ];

  if (!str.length) return errType[1];
  if (str.length < 8) return errType[5];
  if (str.length > 16) return errType[6];
  if (!tieneLet(str)) return errType[3];
  if (!tieneNum(str)) return errType[4];
  if (tieneSimb(str)) return errType[2];

  return errType[0];
}

export function validarNombreyApellido(str) {
  const errType = ["", "Este campo es Obligatorio", "Solo letras"];
  if (!str.length) return errType[1];
  if (tieneNum(str) || tieneSimb(str)) return errType[2];
  return errType[0];
}

export function validarEmail(str) {
  const errType = ["", "Este campo es Obligatorio"];
  if (!str.length) return errType[1];
  if (str.length) return errType[0];
}

export function validarGithub(str) {
  const errType = ["", "Este campo es Obligatorio"];
  if (!str.length) return errType[1];
  if (str.length) return errType[0];
}

// 1. nombre del input y valor
// 2. objeto con todos los nombres y valores
// si el input no se encuentra devuelve 'field not found' en el valor del input
export default function validate(input, value, cb) {
  const errors = {};

  if (typeof input === "object") {
    for (var p in input) {
      if (p === "username") errors[p] = validarUsername(input[p]);
      if (p === "password") errors[p] = validarPassword(input[p]);
      if (p === "name") errors[p] = validarNombreyApellido(input[p]);
      if (p === "lastname") errors[p] = validarNombreyApellido(input[p]);
      if (p === "email") errors[p] = validarEmail(input[p]);
      if (p === "gitaccount") errors[p] = validarUsername(input[p]);
    }
    return errors;
  }

  if (input === "username") return validarUsername(value);
  if (input === "password") return validarPassword(value);
  if (input === "name") return validarNombreyApellido(value);
  if (input === "lastname") return validarNombreyApellido(value);
  if (input === "email") return validarEmail(value);
  if (input === "gitaccount") return validarGithub(value);

  return "Field not found";
}

/*
function existe() {
  var arr = usuarios.filter((usuario) => usuario.username === inputs.username);
  if (arr.length === 0) {
    return false;
  } else {
    return true;
  }
}
*/
