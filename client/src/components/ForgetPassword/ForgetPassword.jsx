import React from "react";
import { useDispatch } from "react-redux";
import {useLocation} from "react-router-dom";
import { useState } from "react";
import validate from "../../utils/validate";
import { updatePassword } from "../../Redux/actions/Session.js";


export default function ForgetPassword() {
  const dispatch = useDispatch()
  const { search } = useLocation();

  const [inputs,setInputs] = useState({})
  const [err,setErr] = useState({})

  const handleChange = async(e)=>{
    setInputs({...inputs,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(!inputs.password || !inputs.repeat){
      setErr({...err, inputs:"input vacio"})
      return
    }
    if(inputs.password !== inputs.repeat){
      setErr({...err, inputs:"deben ser iguales"})
      return
    }
    if(inputs.password.length < 6 || inputs.password.length > 16){
      setErr({...err, inputs:"deben contener entre 6 y 16 caracteres"})
      return      
    }
    setErr({})
    dispatch(updatePassword({password:inputs.password}, search))
  }
  return (
    <div >
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">new Password</label>
        <input
          onChange={(e) => handleChange(e)}
          value={inputs.password}
          name="password"
          type="password"
          placeholder="password..."
        />
        <label htmlFor="repeat">Repeat password</label>
        <input
          onChange={(e) => handleChange(e)}
          value={inputs.repeat}
          name="repeat"
          type="password"
          placeholder="password..."
        />
       <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
