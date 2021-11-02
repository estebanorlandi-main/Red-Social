import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/actions/Users";
import validate from "../../utils/validate";
import styles from "./Profile.module.css";
import Select from "react-select";

export default function Profile(props) {
  const dispatch = useDispatch();
  const [firstLoad, setFistLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      dispatch(getUser(props.username));
      setFistLoad(false);
    }
  });

  const session = useSelector((state) => state.sessionReducer);
  const profile = useSelector((state) => state.usersReducer.profile);

  const [input, setInput] = useState({
    name: "",
    lastName: "",
    about: "",
    tags: [],
  });

  const onDropdownChange = (value) => {
    //setTagsSelected(value);
    console.log(value);
  };

  return profile ? (
    <div className={styles.container}>
      <img src={profile.avatar} alt="avatar" />

      <h3>Username</h3>
      <p> {profile.username}</p>

      <h3>Name</h3>
      <p>{profile.name}</p>

      <h3>Github</h3>
      <p>{profile.lastName}</p>

      <h3>Email</h3>
      <p>{profile.email}</p>

      <h3>Github</h3>
      <p>{profile.github}</p>

      <h3>About</h3>
      <p>{profile.about}</p>

      <h3>Tags</h3>
      <div>{profile.tags && profile.tags.map((tag) => <span>{tag}</span>)}</div>
    </div>
  ) : (
    ""
  );
}
