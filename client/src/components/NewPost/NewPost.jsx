import style from "./NewPost.module.css";
import { useState } from "react";
import { createPost, updatePage } from "../../Redux/actions/Post.js";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import validate from "../../utils/validate";
import ImageUpload from "../ImageUpload/ImageUpload";

export default function NewPost() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.sessionReducer || {});
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

  const handleImage = (e) => {
    if (!e) return setData((old) => ({ ...old, image: null }));

    const {
      target: { name, files },
    } = e;

    setData((old) => ({ ...old, [name]: files[0] }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!Object.values(errores).filter((error) => error).length) {
      const formData = new FormData();

      if(session.dayBan === null){
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("image", data.image);
      formData.append("tag", data.tag);
      formData.append("username", data.username);

      dispatch(createPost(formData));
      }else{
        alert('You are banned, therefore you cannot post anything')
      }
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
      <label className={style.wrapper}>
        <div className="input-group">
          <input
            value={data.title}
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="Post title"
            autoComplete="off"
          />
        </div>
        <span>{errores.title}</span>
      </label>

      <label className={style.wrapper}>
        <textarea
          value={data.content}
          onChange={handleChange}
          name="content"
          type="text"
          autoComplete="off"
          placeholder="Your message"
        />
        <span>{errores.content}</span>
      </label>

      <ImageUpload onChange={handleImage} />

      <label className={style.wrapper}>
        <Select
          onChange={handleSelect}
          options={options}
          menuPlacement="top"
          placeholder="Tags"
          isMulti
        />
        <span className={style.error}></span>
      </label>

      <button className={style.submit} type="submit">
        Crear
      </button>
    </form>
  );
}
