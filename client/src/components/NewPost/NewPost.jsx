import style from "./NewPost.module.css";
import { useState } from "react";
import { createPost, updatePage } from "../../Redux/actions/Post.js";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import validate from "../../utils/validate";

export default function NewPost() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.sessionReducer || {});
  const allTags = useSelector((state) => state.postsReducer.tags);
  const [data, setData] = useState({
    title: "",
    content: "",
    image: null,
    tag: [],
    likes: 0,
    username: session.username,
  });

  const [errores, setErrores] = useState({
    title: "",
    content: "",
  });
  const [options, setOptions] = useState(allTags.map(tag => {return ({value: tag.label, label: tag.label})}))//El select no funciona sin un array de objetos con value y label

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

  const handleImage = ({ target: { name, files } }) => {
    setData((old) => ({ ...old, [name]: files[0] }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!Object.values(errores).filter((error) => error).length) {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("image", data.image);
      formData.append("tag", data.tag);
      formData.append("username", data.username);

      dispatch(createPost(formData));

      setData({
        title: "",
        content: "",
        image: null,
        tag: [],
        likes: 0,
        username: session.username,
      });
      //console.log(obj);
      //dispatch(updatePage(true, obj.payload.posts));
    }
  }

  return (
    <form className={style.container} onSubmit={(e) => handleSubmit(e)}>
      <h3>{data.username}</h3>

      <label className={style.wrapper}>
        Title
        <input
          value={data.title}
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleImage}
          name="image"
          type="file"
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
