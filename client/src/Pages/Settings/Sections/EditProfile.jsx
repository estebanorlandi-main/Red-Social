import { useSelector } from "react-redux";
import Select from "react-select";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";

import styles from "./EditProfile.module.css";
import { useState } from "react";
import { updateUser } from "../../../Redux/actions/Session";

function EditProfile(props) {
  const session = useSelector((state) => state.sessionReducer);

  const [inputs, setInputs] = useState({
    tags: session.tags,
  });

  const [errors, setErrors] = useState({});

  const handleTags = (options) => {
    setInputs((old) => ({ ...old, tags: options.map((tag) => tag.value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every()) updateUser(session.username, inputs);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>User</h3>

      <ImageUpload />

      <div className={styles.inline}>
        <label>
          Nombre
          <div className="input-group">
            <input placeholder={session.name} />
          </div>
        </label>

        <label>
          Apellido
          <div className="input-group">
            <input placeholder={session.lastname} />
          </div>
        </label>
      </div>

      <label>
        About
        <div className="input-group">
          <textarea placeholder={session.about} />
        </div>
      </label>

      <label>
        Tags
        <Select
          value={inputs.tags.map((tag) => ({
            label: tag,
            value: tag,
          }))}
          name="tags"
          onChange={handleTags}
          placeholder="Tags"
          isMulti
        />
      </label>
    </form>
  );
}

export default EditProfile;
