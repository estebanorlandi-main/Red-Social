import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tags from "../../../components/Tags/Tags";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import { getTags, loadTags } from "../../../Redux/actions/Post";
import styles from "./EditProfile.module.css";
import { updateUser } from "../../../Redux/actions/Session";

function EditProfile(props) {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.sessionReducer);
  const allTags = useSelector((state) => state.postsReducer.tags);

  const [inputs, setInputs] = useState({
    name: "",
    lastname: "",
    gitaccount: "",
    about: "",
    tags: [],
  });

  useEffect(async () => {
    if (allTags.length === 0) {
      console.log("entre")
      await dispatch(loadTags());
      dispatch(getTags())
    }
  }, [allTags]);
  /*const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    gitaccount: "",
    about: "",
  });*/

  const handleTags = (options) => {
    setInputs((old) => ({ ...old, tags: options.map((tag) => tag.value) }));
  };

  const handleChange = ({ target: { name, value } }) => {
    setInputs((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(session.username, inputs));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>User</h3>

      <ImageUpload />

      <div className={styles.inline}>
        <label>
          Nombre
          <div className="input-group">
            <input
              name="name"
              onChange={handleChange}
              placeholder={session.name || "Name"}
              value={inputs.name}
            />
          </div>
        </label>

        <label>
          Apellido
          <div className="input-group">
            <input
              name="lastname"
              onChange={handleChange}
              placeholder={session.lastname || "Last Name"}
              value={inputs.lastname}
            />
          </div>
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

      <label>
        Tags
        <Tags tags={session.tags} mode={true} handleSelect={handleTags} editTags={inputs.tags}/>
      </label>
      <button type="submit">Change</button>
    </form>
  );
}

export default EditProfile;
