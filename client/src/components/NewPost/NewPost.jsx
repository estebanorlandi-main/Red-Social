import style from "./NewPost.module.css";
import { useState } from "react";
import { createPost } from "../../Redux/actions/Post.js";
import { useDispatch } from "react-redux";

export default function NewPost() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    title: "",
    content: "",
    image: "",
    tag: "",
    likes: [],
    username: "aca iria el nombre del usuario",
  });

  const [errores, setErrores] = useState({
    title: { indice: 0, err: ["", "Campo Obligatorio"] },
    content: {
      indice: 0,
      err: ["", "Por lo menos un content o imagen", "Maximo 1000 Caracteres"],
    },
    image: { indice: 0, err: ["", "Por lo menos un content o imagen"] },
  });

  const [img, setImg] = useState({
    url: "",
    mostrar: false,
  });

  function separarTags(str) {
    var arr = str.split(",");
    setData((old) => ({
      ...old,
      tag: arr,
    }));
  }

  function existe(str, str2, str3) {
    var textos = [str, str2, str3];
    let arr = textos.map((texto) => {
      if (!data[texto].length) {
        setErrores((old) => ({
          ...old,
          [texto]: { ...old[texto], indice: 1 },
        }));
        return false;
      } else {
        setErrores((old) => ({
          ...old,
          [texto]: { ...old[texto], indice: 0 },
        }));
        return true;
      }
    });
    return arr;
  }

  function verificar() {
    var arr = existe("title", "content", "image");
    if (arr[0] === true && (arr[1] === true || arr[2] === true)) {
      setErrores({
        title: { indice: 0, err: ["", "Campo Obligatorio"] },
        content: {
          indice: 0,
          err: [
            "",
            "Por lo menos un content o imagen",
            "Maximo 1000 Caracteres",
          ],
        },
        image: { indice: 0, err: ["", "Por lo menos un content o imagen"] },
      });
      return true;
    } else if (arr[1] === true || arr[2] === true) {
      setErrores({
        title: { indice: 1, err: ["", "Campo Obligatorio"] },
        content: { indice: 0, err: ["", "Por lo menos un content o imagen"] },
        image: { indice: 0, err: ["", "Por lo menos un content o imagen"] },
      });
    }
  }

  function handleChange(e) {
    console.log(e.target.value.length);
    if (e.target.name === "tag") {
      separarTags(e.target.value);
      return;
    }
    if (e.target.name === "image") {
      setImg((old) => ({
        ...old,
        url: e.target.value,
        mostrar: false,
      }));
      return;
    }
    if (e.target.name === "content" && data.content.length === 1000) {
      if (e.target.value.length > 1000) {
        setErrores((old) => ({
          ...old,
          content: {
            ...old.content,
            indice: 2,
          },
        }));
        return;
      }
      setErrores((old) => ({
        ...old,
        content: {
          ...old.content,
          indice: 0,
        },
      }));
    }
    setData((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    setImg((old) => ({
      ...old,
      mostrar: true,
    }));
    e.preventDefault();
    if (verificar()) {
      dispatch(createPost(data));
      setData({
        title: "",
        content: "",
        image: "",
        tag: "",
        likes: [],
        username: "aca iria el nombre del usuario",
      });
    }
  }
  return (
    <form
      className={style.container}
      onSubmit={(e) => handleSubmit(e)}
      onChange={(e) => handleChange(e)}
    >
      <h3>{data.username}</h3>

      <label className={style.wrapper}>
        Title
        <input
          value={data.title}
          name="title"
          type="text"
          placeholder="Title"
        />
        <span className={style.error}>
          {errores.title.err[errores.title.indice]}
        </span>
      </label>

      <label className={style.wrapper}>
        Content
        <textarea value={data.content} name="content" type="text" />
        <span className={style.error}>
          {errores.content.err[errores.content.indice]}
        </span>
      </label>

      <label className={style.wrapper}>
        <div>{data.content.length}/1000</div>
        <textarea
          className={style.textarea}
          value={data.content}
          name="content"
          type="text"
        />
        <div className={style.errores}>
          {errores.content.err[errores.content.indice]}
        </div>
      </label>

      {/*<label>
        image
         <br/>
        {img.mostrar ? <img className={style.img} src={img.url} alt="Esa Imagen no es valida"/> : ""}
      </label>*/}
      <label className={style.wrapper}>
        Image
        <input
          value={data.image}
          name="image"
          type="text"
          placeholder="Image"
        />
        <span className={style.error}>
          {errores.image.err[errores.image.indice]}
        </span>
      </label>

      <label className={style.wrapper}>
        Tags
        <input value={data.tag} name="tag" type="text" placeholder="Tags" />
        <span className={style.error}></span>
      </label>

      <button className={style.submit} type="submit">
        Crear
      </button>
    </form>
  );
}
