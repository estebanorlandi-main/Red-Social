import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createSupport } from "../../Redux/actions/Support";
import style from "./Support.module.css";
import { BiSupport } from "react-icons/bi";

export default function Support() {
  const dispatch = useDispatch();
  const history = useHistory();
  const session = useSelector((state) => state.sessionReducer);
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    username: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    inputs.username = session.username;
    dispatch(createSupport(inputs));
    setInputs({ title: "", content: "", username: "" });
    alert('Message send')
    history.push("/home");
  };

  return (
    <div>
      <form className={style.container}>

        <h2><BiSupport/> Support</h2>
        <section>
          
        </section>
        <label className={style.wrapper}>
          Title
          <div className="input-group">
            <input
              onChange={(e) => handleChange(e)}
              className={style.input}
              value={inputs.title}
              name="title"
              type="text"
              placeholder="Title..."
            />                
          </div>    
        </label>

        {/* <div className={style.errores}>{err.username}</div> */}
        <label className={style.wrapper}>
          Content
          <div className="input-group">
            <textarea
              onChange={(e) => handleChange(e)}
              className={style.input}
              value={inputs.content}
              name="content"
              type="text"
              cols="25"
              rows="4"
              placeholder="Content..."
            ></textarea>               
          </div>      
        </label>
        <button className={style.submit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

