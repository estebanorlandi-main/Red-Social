import style from "./NewPost.module.css";
import { useEffect, useState } from "react";
import {
  commentPost,
  createPost,
  updatePage,
} from "../../Redux/actions/Post.js";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import validate from "../../utils/validate";
import ImageUpload from "../ImageUpload/ImageUpload";
import Tags from "../Tags/Tags";
import { infoAdmin } from "../../Redux/actions/Admin";

export default function NewPost({ orden, tags }) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.sessionReducer || {});
  const info = useSelector((state) => state.usersReducer.users);
  const profile = useSelector((state) => state.usersReducer.profile);
  var day = new Date();

  useEffect(() => {
    dispatch(infoAdmin(session.username));
  }, [dispatch]);

  const [data, setData] = useState({
    title: "",
    content: "",
    image: null,
    type: "normal",
    tag: [],
    likes: 0,
    username: session.username,
  });

  const [errores, setErrores] = useState({
    title: "",
    content: "",
    general:"",
  });

  const type = [
    { value: "normal", label: "Normal" },
    { value: "challenge", label: "Challenge" },
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
    setErrores((old) => ({ ...old, [name]: validate(name, value), general:"" }));
  }

  const handleSelect = (e) => {
    setData((old) => ({ ...old, tag: e.map((option) => option.value) }));
  };

  const handleSelectType = (e) => {
    setData((old) => ({ ...old, type: e.value }));
  };

  const handleImage = (e) => {
    if (!e) return setData((old) => ({ ...old, image: null }));

    const {
      target: { name, files },
    } = e;

    setData((old) => ({ ...old, [name]: files[0] }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!Object.values(errores).filter((error) => error).length) {
      const day = new Date();
      if (day > info.dayBan || !info.dayBan) {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("image", data.image);
        formData.append("tag", data.tag);
        formData.append("username", data.username);
        formData.append("type", data.type);
        let seguidos;
        if (profile.following) {
          seguidos = profile.following.map((user) => user.username);
        } else {
          seguidos = [];
        }
        let errores = await dispatch(
          createPost(formData, orden, tags, seguidos)
        );
        if (errores.type === "ERROR") {
          setErrores((old)=>({...old, general:"se ha producido un error"}));
        } else {
          setData({
            title: "",
            content: "",
            image: null,
            tag: [],
            likes: 0,
            type: "normal",
            username: session.username,
          });
        }
      } else {
        alert("You are banned, therefore you cannot post anything");
      }
    }
  }

  return (
    <form className={style.container} onSubmit={(e) => handleSubmit(e)}>
      <label className={style.wrapper}>
        Title
        <div className="input-group">
          <input
            value={data.title}
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="Title"
            autoComplete="off"
          />
        </div>
        <span>{errores.title}</span>
      </label>

      <label className={style.wrapper}>
        Content {data.content.length}/1000
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
        <Tags
          tags={[]}
          mode={true}
          handleSelect={handleSelect}
          editTags={data.tag}
        />

        <span className={style.error}></span>
      </label>
      <label className={style.wrapper}>
        <Select onChange={handleSelectType} options={type} />
        <span className={style.error}></span>
      </label>
      <span>{errores.general}</span>
      <button className={style.submit} type="submit">
        Create
      </button>
    </form>
  );
}
