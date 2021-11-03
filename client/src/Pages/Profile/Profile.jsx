import { useEffect, useState } from "react";
import userimg from "../../images/userCard.png";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../../Redux/actions/Users";
import { updateUser } from "../../Redux/actions/Session";
import validate from "../../utils/validate";
import styles from "./Profile.module.css";
import Select from "react-select";

const selectStyles = {
  control: (styles) => ({ ...styles, width: "100%" }),
};

// cambiar a estado traido de la DB
const options = [
  { value: "js", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "c++", label: "C++" },
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
  const [editar, setEditar] = useState(false);
  const [first, setFirst] = useState(true);

  const session = useSelector((state) => state.sessionReducer);
  const profile = useSelector((state) => state.usersReducer.profile);

  const myProfile = session.username === profile.username;

<<<<<<< HEAD
  useEffect(() => {
    dispatch(getUser(props.username));
  }, [profile, dispatch, first, props.username]);

=======
>>>>>>> b4d1ec02772401e8655fb1f06fbd4ff15f29f55f
  const [inputs, setInputs] = useState({
    name: session.name || "",
    lastname: session.lastname || "",
    about: session.about || "",
    tags: session.tags || [],
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
  });

  useEffect(() => {
    if (first) {
      dispatch(getUser(props.username));
      setFirst(false);
    }
  }, [profile, dispatch, first, props.username]);

  const handleChange = ({ target: { name, value } }) => {
    setInputs((old) => ({ ...old, [name]: value }));
    setErrors((old) => ({ ...old, [name]: validate(name, value) }));
  };

  const handleSelect = (e) => {
    setInputs((old) => ({ ...old, tags: e.map((option) => option.value) }));
  };

  const handleSubmit = () => {
    const errs = validate(inputs);
    if (Object.values(errs).filter((e) => e).length) return setErrors(errs);

    dispatch(updateUser(profile.id, inputs));
    dispatch(getUser(props.username));
  };

  return profile ? (
    <div className={styles.container}>
      {session.username === profile.username ? (
        <button onClick={() => setEditar((old) => !old)}>Editar</button>
      ) : (
        ""
      )}
      <img
        className={styles.avatar}
        src={profile.avatar || userimg}
        alt="avatar"
      />

      <h3>Username</h3>
      <p>{profile.username}</p>

      <h3>Name</h3>
      <div>
        {myProfile && editar ? (
          <>
            <input
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder={session.name}
            />
            <p>{errors.name}</p>

            <input
              name="lastname"
              onChange={handleChange}
              value={inputs.lastname}
              placeholder={session.lasnName}
            />
            <p>{errors.lastname}</p>
          </>
        ) : (
          <p>
            {profile.name} {profile.lastname}
          </p>
        )}
      </div>

      <h3>Email</h3>
      <p>{profile.email}</p>

      <h3>Github</h3>
      <p>{profile.gitaccount}</p>

      <h3>About</h3>
      {myProfile && editar ? (
        <>
          <textarea
            name="about"
            onChange={handleChange}
            value={inputs.about}
            placeholder={session.about}
          ></textarea>
        </>
      ) : (
        <p>{profile.about}</p>
      )}

      <h3>Tags</h3>
      {myProfile && editar ? (
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
          profile.tags
            .filter((tag) => tag)
            .map((tag, i) => (
              <span key={i} className={styles.tag}>
                {tag}
              </span>
            ))}
      </div>

      {myProfile && editar ? (
        <button onClick={handleSubmit}>Change</button>
      ) : (
        ""
      )}
    </div>
  ) : (
    ""
  );
}
