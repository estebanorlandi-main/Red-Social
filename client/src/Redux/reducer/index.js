//const initialState = {}

import { combineReducers } from "redux";

import postsReducer from "./posts.js";

import sessionReducer from "./session.js";

import usersReducer from "./users.js";

import adminReducer from "./admin.js"

import supportReducer from "./support.js"

export default combineReducers({
  postsReducer, // Array con todos los posteos / filtrar posteos - busqueda - ordernar
  sessionReducer, // Objeto Datos del usuario logeado / login - logout - register
  usersReducer, // Array con todos los usuarios / Filtrar usuarios - busqueda - ordenar
  adminReducer, //Objeto Datos del admin: -login -privileges -singup
  supportReducer //Objeto con todos los reportes
});
