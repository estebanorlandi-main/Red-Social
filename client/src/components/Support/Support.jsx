import { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { Link, useHistory  } from "react-router-dom";
import { createSupport } from "../../Redux/actions/Support";
import style from "./Support.css";




export default function Support(){
  const dispatch = useDispatch();
  const history = useHistory();
  const session = useSelector((state) => state.sessionReducer)
  const [inputs, setInputs] = useState({title:"", content:"", username:""})
  console.log(session.username)

  const handleChange =(e)=>{
    setInputs({
        ...inputs,
        [e.target.name] : e.target.value
    });}

  const handleSubmit = (e)=>{
    e.preventDefault();
    inputs.username = session.username
    dispatch(
      createSupport(inputs)
    )
    alert("Message enviado")
    setInputs({title:"", content:"", username:""})
    history.push('/home')
  }

  return(
      <div>
        <form className={style.container} >
        Support
        <label>Tile</label>
        <input
          onChange={(e) => handleChange(e)}
          className={style.input}
          value={inputs.title}
          name="title"
          type="text"
        />
        {/* <div className={style.errores}>{err.username}</div> */}
        <label>Content</label>
        <textarea
          onChange={(e) => handleChange(e)}
          className={style.input}
          value={inputs.content}
          name="content"
          type="text"
          cols="20"
          rows="5"
          >
          </textarea>
          <input type="submit" onClick={(e) => handleSubmit(e)}/>
        </form>
      </div>
  )
}