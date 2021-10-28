import style from "./NewPost.module.css";
import { useState } from "react";
import {createPost} from "../../Redux/actions/Post.js"
import { useDispatch } from 'react-redux' ;


export default function NewPost() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title:"",
    content:"",
    image:"",
    tag:"",
    likes:[],
    username:"aca iria el nombre del usuario"
  })
  const [errores, setErrores] = useState({
    title:{indice:0, err:["", "Campo Obligatorio"]},
    content:{indice:0,err:["", "Por lo menos un content o imagen"]},
    image:{indice:0,err:["", "Por lo menos un content o imagen"] }
  })

  function separarTags(str){
    var arr = str.split(",")
    setData((old)=>({
      ...old,
        tag:arr
    }))
  }

  function existe(str, str2, str3){
    var textos = [str, str2, str3]
    let arr = textos.map((texto)=>{
        if (!data[texto].length) {
          setErrores((old)=>({
            ...old,
            [texto]:{...old[texto], indice:1}
          }))
          return false
        }else {
          setErrores((old)=>({
            ...old,
            [texto]:{...old[texto], indice:0}
          }))
          return true
        }
    })
    return arr
  }

  function verificar(){
      var arr = existe("title","content","image")
      if (arr[0]===true && (arr[1]===true || arr[2]===true)) {
        setErrores(
          {
            title:{indice:0, err:["", "Campo Obligatorio"]},
            content:{indice:0,err:["", "Por lo menos un content o imagen"]},
            image:{indice:0,err:["", "Por lo menos un content o imagen"] }
          }
        )
        return true
      }
  }

  function handleChange(e){
    if (e.target.name === "tag") {
      separarTags(e.target.value)
    }
    setData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e){
    e.preventDefault();
    if (verificar()) {
      dispatch(createPost(data))
      setData({
        title:"",
        content:"",
        image:"",
        tag:[],
      })
    }
  }
  return (
    <div>
    <form className={style.container} onSubmit={(e)=>handleSubmit(e)} onChange={(e)=>handleChange(e)}>
      Formulario de creacion de post
      <label>
        title
      </label>
        <input className={style.input} value={data.title} name="title" type="text" />
        <div>{errores.title.err[errores.title.indice]}</div>
      <label>
        content
      </label>
        <input className={style.input} value={data.content} name="content" type="text" />
        <div>{errores.content.err[errores.content.indice]}</div>
      <label>
        image
      </label>
        <input className={style.input} value={data.image} name="image" type="text" />
        <div>{errores.image.err[errores.image.indice]}</div>
      <label>
        tag
      </label>
        <input className={style.input} value={data.tag} name="tag" type="text" />
      {/*
        <label>
        likes
      </label>
        <input className={style.input} value={data.likes} name="likes" type="text" />
      */}
      <label>
        {data.username}
      </label>
        <button type="submit">Crear</button>
    </form>
    </div>
  );
}
