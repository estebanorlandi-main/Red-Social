import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../Redux/actions/Users";
import validate from "../../utils/validate";
import styles from "./Profile.module.css";
import Select from "react-select";
import {ChangeSession} from "../../Redux/actions/Profile.js"
const selectStyles = {
  control: (styles) => ({ ...styles, width: "100%" }),
};

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


export default function Profile(props) {
  const dispatch = useDispatch();
  const [firstLoad, setFistLoad] = useState(true);
  const [editar, setEditar] = useState(false);
  dispatch(getUser(props.username));

  const session = useSelector((state) => state.sessionReducer);
  const profile = useSelector((state) => state.usersReducer.profile);

  const [inputs, setInputs] = useState({
    name: session.name || "",
    lastName: session.lastName || "",
    about: session.about || "",
    tags: session.tags || [],
  });

  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputs((old) => ({ ...old, [name]: value }));
    setErrors((old) => ({ ...old, [name]: validate(name, value) }));
  };

  const handleSelect = (e) => {
    setInputs((old) => ({ ...old, tags: e.map((option) => option.value) }));
  };

  const handleSubmit = (value) => {
    const errs = validate(inputs);
    if (Object.values(errs).filter((e) => e).length) return setErrors(errs);
    dispatch(updateUser(session.username, inputs));
    dispatch(ChangeSession(session.username, inputs))
  };

  return profile ? (
    <div className={styles.container}>
    { session.username === profile.username? <button onClick={()=> setEditar((old)=>!old)}>Editar</button> : "" }
      <img className={styles.avatar} src={profile.avatar} alt="avatar" />

      <h3>Username</h3>
      <p>{profile.username}</p>

      <h3>Name</h3>
      <div>
        {session.username === profile.username && editar ? (
          <Fragment>
            <input
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder={session.name}
            />
            <p>{errors.name}</p>

            <input
              name="lastName"
              onChange={handleChange}
              value={inputs.lastName}
              placeholder={session.lastName}
            />
            <p>{errors.lastName}</p>
          </Fragment>
        ) : (
          <p>
            {profile.name} {profile.lastName}
          </p>
        )}
      </div>

      <h3>Email</h3>
      <p>{profile.email}</p>

      <h3>Github</h3>
      <p>{profile.github}</p>

      <h3>About</h3>
      {session.username === profile.username && editar ? (
        <Fragment>
          <textarea
            name="about"
            onChange={handleChange}
            value={inputs.about}
            placeholder={session.about}
          ></textarea>
        </Fragment>
      ) : (
        <p>{profile.about}</p>
      )}

      <h3>Tags</h3>
      {session.username === profile.username && editar ? (
        <Select
          onChange={handleSelect}
          className={styles.select_container}
          options={options}
          styles={selectStyles}
          isMulti
        />
      ) : (
        ""
      )}

      <div className={styles.tags}>
        {profile.tags &&
          profile.tags.map((tag) => <span className={styles.tag}>{tag}</span>)}
      </div>

      {session.username === profile.username && editar ? (
        <button onClick={handleSubmit}>Change</button>
      ) : (
        ""
      )}
    </div>
  ) : (
    ""
  );
}
