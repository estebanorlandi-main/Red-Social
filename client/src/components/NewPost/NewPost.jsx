import style from "./NewPost.module.css";
import { useState } from "react";
import { createPost, updatePage } from "../../Redux/actions/Post.js";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import validate from "../../utils/validate";

export default function NewPost() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.sessionReducer || {});
  const [data, setData] = useState({
    title: "",
    content: "",
    image: "",
    tag: [],
    likes: 0,
    username: session.username,
  });

  const [errores, setErrores] = useState({
    title: "",
    content: "",
    image: "",
  });

  const options = [
    { value: "js", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "cpp", label: "C++" },
    { value: "php", label: "PHP" },
    { value: "java", label: "Java" },
    { value: "c", label: "C" },
    { value: "go", label: "Go" },
    { value: "kotlin", label: "Kotiln" },
    { value: "sql", label: "SQL" },
    { value: "mongodb", label: "MongoDB" },
    { value: "postgresql", label: "PostgreSQL" },
  ];

  /*function separarTags(str) {
    var arr = str.split(",");
    setData((old) => ({
      ...old,
      tag: arr,
    }));
  }*/

  function handleChange({ target: { name, value } }) {
    setData((old) => ({ ...old, [name]: value }));
    setErrores((old) => ({ ...old, [name]: validate(name, value) }));
  }

  const handleSelect = (e) => {
    setData((old) => ({ ...old, tag: e.map((option) => option.value) }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!Object.values(errores).filter((error) => error).length) {
      console.log(data);
      let obj = await dispatch(createPost(data));
      setData({
        title: "",
        content: "",
        image: "",
        tag: [],
        likes: 0,
        username: session.username,
      });
      console.log(obj);
      dispatch(updatePage(true, obj.payload.posts));
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
          autoComplete="off"
        />
        <span className={style.error}>{errores.title}</span>
      </label>
      <label className={style.wrapper}>
        Content {data.content.length}/1000
        <textarea
          className={style.textarea}
          value={data.content}
          name="content"
          type="text"
          autoComplete="off"
        />
        <span className={style.error}>{errores.content}</span>
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
        <span className={style.error}>{errores.image}</span>
      </label>

      <label className={style.wrapper}>
        Tags
        <Select onChange={handleSelect} options={options} isMulti />
        <span className={style.error}></span>
      </label>

      <button className={style.submit} type="submit">
        Crear
      </button>
    </form>
  );
}
