import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tags from "../../../components/Tags/Tags";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { getTags, loadTags } from "../../../Redux/actions/Post";
import styles from "./EditProfile.module.css";
import { updateUser } from "../../../Redux/actions/Session";
import { Redirect } from "react-router";
import axios from "axios";

function EditProfile(props) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.sessionReducer);
  const allTags = useSelector((state) => state.postsReducer.tags);

  const [inputs, setInputs] = useState({
    name: session.name || "",
    lastname: session.lastname || "",
    gitaccount: session.gitaccount || "",
    about: session.about || "",
    tags: session.tags || [],
    image: session.image || null,
  });
  const [file, setFile] = useState(inputs.image);

  const [errors, setErrors] = useState({
    about: "",
    gitaccount: "",
    lastname: "",
    name: ",",
  });

  const [submit, setSubmit] = useState(false);
  useEffect(async () => {
    if (allTags.length === 0) {
      await dispatch(loadTags());
      dispatch(getTags());
    }
  }, [allTags]);
  /*const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    gitaccount: "",
    about: "",
  });*/

  const handleImagechange = (e) => {
    if (e?.target?.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(session.image);
    }
  };

  const handleTags = (options) => {
    if (options.length === 0) {
      setInputs((old) => ({ ...old, tags: [] }));
    }
    setInputs((old) => ({ ...old, tags: options.map((tag) => tag.value) }));
  };

  const handleChange = ({ target: { name, value } }) => {
    setInputs((old) => ({ ...old, [name]: value }));
    setErrors((old) => ({ ...old, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", file);
    formData.append("name", inputs.name);
    formData.append("lastname", inputs.lastname);
    formData.append("gitaccount", inputs.gitaccount);
    formData.append("about", inputs.about);

    let errores = await dispatch(updateUser(session.username, formData));
    if (errores.type === "ERROR") {
      let err = Object.keys(errores.payload.response.data);
      for (var i = 0; i < err.length; i++) {
        setErrors((old) => ({
          ...old,
          [err[i]]: errores.payload.response.data[err[i]],
        }));
      }
    } else {
      setSubmit(true);
    }
  };

  return submit ? (
    <Redirect to={`/profile/${session.username}`} />
  ) : (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>User</h3>

      <ImageUpload
        onChange={handleImagechange}
        imagedata={file || session.image}
        edit
      />

      <div className={styles.inline}>
        <label>
          Name
          <div className="input-group">
            <input
              name="name"
              onChange={handleChange}
              placeholder={session.name || "Name"}
              value={inputs.name}
            />
          </div>
          <span style={{ fontSize: "0.8em" }}>{errors.name}</span>
        </label>

        <label>
          Last Name
          <div className="input-group">
            <input
              name="lastname"
              onChange={handleChange}
              placeholder={session.lastname || "Last Name"}
              value={inputs.lastname}
            />
          </div>
          <span style={{ fontSize: "0.8em" }}>{errors.lastname}</span>
        </label>
      </div>

      <label>
        GitHub
        <div className="input-group">
          <input
            name="gitaccount"
            onChange={handleChange}
            placeholder={session.gitaccount || "GitHub Account"}
            value={inputs.gitaccount}
          />
        </div>
      </label>
      <span style={{ fontSize: "0.8em" }}>{errors.gitaccount}</span>
      <label>
        About
        <div className="input-group">
          <textarea
            name="about"
            onChange={handleChange}
            placeholder={session.about || "About"}
            value={inputs.about}
          />
        </div>
      </label>
      <span style={{ fontSize: "0.8em" }}>{errors.about}</span>
      <label>
        Tags
        <Tags
          tags={session.tags ? session.tags : []}
          mode={true}
          handleSelect={handleTags}
          editTags={inputs.tags}
        />
      </label>
      <button type="submit">Change</button>
    </form>
  );
}

export default EditProfile;
