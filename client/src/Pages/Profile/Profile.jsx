import { useEffect, useState } from "react";
import axios from "axios";
import userimg from "../../images/userCard.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeProfile } from "../../Redux/actions/Users";
import { getTags, loadTags } from "../../Redux/actions/Post";
import Post from "../../components/Post/Post";
import Follow, { FollowBtn } from "../Follow/Follow.jsx";
import { getUser, socketConnection } from "../../Redux/actions/Users";
import { conversation, updateUser } from "../../Redux/actions/Session";
import validate from "../../utils/validate";
import styles from "./Profile.module.css";
import Select from "react-select";
import { BsFillPencilFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { BsGithub } from "react-icons/bs";

import { MdMessage } from "react-icons/md";

import Tags from "../../components/Tags/Tags";
import { Link } from "react-router-dom";

const selectStyles = {
  control: (styles) => ({ ...styles, width: "100%" }),
};

// cambiar a estado traido de la DB

export default function Profile(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [editar, setEditar] = useState(false);

  const session = useSelector((state) => state.sessionReducer);
  const profile = useSelector((state) => state.usersReducer.profile);
  const [followersOnline, setFollowersOnline] = useState(null);
  console.log(followersOnline);

  // console.log(session);
  console.log(profile, "Hola soy profile");

  const allTags = useSelector((state) => state.postsReducer.tags);
  const socket = useSelector((state) => state.usersReducer.socket);
  const myProfile = session.username === profile.username;

  useEffect(() => {
    if (socket && Object.keys(socket).length) {
      socket.on("getFollow", (data) => {
        if (profile.username === data.receiverName) {
          setFollowersOnline({
            user: data.receiverName,
            info: data.info,
          });
        }
      });
    }
  }, [socket, profile]);

  useEffect(() => {
    dispatch(getUser(props.username));
    return () => dispatch(removeProfile());
  }, [dispatch, props.username]);
  // console.log(allTags)
  useEffect(() => {
    if (!Object.keys(socket).length) {
      dispatch(socketConnection(session.username));
    }
  }, [dispatch, socket, session.username]);

  useEffect(async () => {
    if (allTags.length === 0) {
      await dispatch(loadTags());
      dispatch(getTags());
    }
  }, [allTags]);

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

    dispatch(updateUser(profile.username, inputs));
    setEditar(false);
  };

  const sendMessage = async () => {
    if (session.username && profile.username !== session.username) {
      const getConversations = async () => {
        try {
          const res = await axios.get(
            "http://localhost:3001/conversation/" + session.username
          );

          return res.data;
        } catch (err) {
          console.log(err);
        }
      };
      const conversations = await getConversations();

      if (
        !!conversations.find((conver) =>
          conver.members.includes(session.username)
        )
      ) {
        history.push("/messenger");
      } else {
        // console.log('se creo una conversacion')
        dispatch(conversation(session.username, profile.username));
        history.push("/messenger");
      }
    }
  };
  console.log(profile.strike);
  let git = profile.gitaccount && profile.gitaccount.split("/");
  git = git && git[git.length - 1];
  return profile ? (
    <div>
      {profile.strike?.length === 3 ? (
        <div>
          <img
            src="https://instagramers.com/wp-content/uploads/2020/11/Portada-Cuenta-inhabilitada-Instagram.png"
            alt=""
          />
        </div>
      ) : (
        <div className={styles.profile}>
          <section className={styles.head}>
            {myProfile && editar ? (
              <button onClick={handleSubmit}>Change</button>
            ) : (
              ""
            )}
            {myProfile ? (
              <Link
                to="/settings"
                className={styles.edit}
                style={myProfile ? {} : { display: "none" }}
              >
                <BsFillPencilFill
                  style={{ color: "#C94F4F", marginRight: "4px" }}
                />
                Edit
              </Link>
            ) : (
              ""
            )}

            <div className={styles.importantInfo}>
              <img
                className={styles.image}
                src={
                  `data:${profile?.image?.imageType};base64, ${profile?.image?.imageData}` ||
                  userimg
                }
                alt=""
              />
              <div className={styles.profileInfoDisplay}>
                <div>
                  {profile.name && profile.lastname ? (
                    <p className={styles.name}>
                      {profile.name} {profile.lastname}
                    </p>
                  ) : (
                    <p></p>
                  )}
                  <p>@{profile.username}</p>
                </div>

                {socket !== undefined ? (
                  <Follow
                    props={{
                      followers: profile.followers,
                      following: profile.following,
                      followersOnline:
                        followersOnline?.info &&
                        profile.username === followersOnline?.user
                          ? followersOnline.info
                          : null,
                      socket: socket,
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div
              className={styles.profileActions}
              style={myProfile ? { display: "none" } : {}}
            >
              {profile.following && !myProfile ? (
                <FollowBtn
                  props={{
                    user: session.username,
                    userImg: session.image,
                    follow: profile.username,
                    info: profile.followers,
                    socket: socket,
                  }}
                />
              ) : (
                <></>
              )}
              {!myProfile ? (
                <button onClick={sendMessage} className={styles.messageButton}>
                  <MdMessage
                    style={{
                      color: "#fff",
                      width: "1.2em",
                      height: "1.2em",
                      marginRight: "4px",
                    }}
                  />{" "}
                  Message
                </button>
              ) : (
                <></>
              )}
            </div>

            {myProfile && editar ? (
              <form>
                <label>
                  <div className="input-group">
                    <input
                      name="name"
                      onChange={handleChange}
                      value={inputs.name}
                      placeholder={session.name}
                    />
                  </div>
                </label>
                <span>{errors.name}</span>

                <label>
                  <div className="input-group">
                    <input
                      name="lastname"
                      onChange={handleChange}
                      value={inputs.lastname}
                      placeholder={session.lasnName}
                    />
                  </div>
                </label>
                <span>{errors.lastname}</span>
              </form>
            ) : (
              <p>{/* {profile.name} {profile.lastname} */}</p>
            )}

            {/* {myProfile && editar ? (
                <Select
                  onChange={handleSelect}
                  className={styles.select_container}
                  options={options}
                  styles={selectStyles}
                  isMulti
                />
              ) : (
                ""
              )} */}
          </section>
          <main className={styles.container}>
            <div className={styles.left}>
              <section>
                <h3>About</h3>
                {myProfile && editar ? (
                  <label>
                    <div className="input-group">
                      <textarea
                        name="about"
                        onChange={handleChange}
                        value={inputs.about}
                        placeholder={session.about}
                      ></textarea>
                    </div>
                  </label>
                ) : (
                  <div>
                    <p className={styles.about}>{profile.about}</p>
                    <hr></hr>

                    <p className={styles.email}>
                      <IoMdMail
                        style={{
                          marginRight: "4px",
                          width: "1.2em",
                          height: "1.2em",
                        }}
                      />
                      {profile.email}{" "}
                    </p>
                    {profile.gitaccount ? (
                      <a className={styles.github} href={profile.gitaccount}>
                        <BsGithub
                          style={{
                            marginRight: "4px",
                            width: "1.2em",
                            height: "1.2em",
                          }}
                        />
                        {git}
                      </a>
                    ) : (
                      <></>
                    )}
                    <h4 style={{ marginTop: "2em", marginBottom: "1em" }}>
                      Tags
                    </h4>
                    <div className={styles.tags}>
                      {profile.tags ? (
                        <Tags
                          tags={profile.tags}
                          mode={editar}
                          handleSelect={handleSelect}
                          editTags={inputs.tags}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                )}
              </section>
              <section>
                <h3>Recomendaciones?</h3>
              </section>
            </div>
            <div className={styles.right}>
              <section className={styles.posts}>
                {profile.posts
                  ? profile.posts.map((post) => (
                      <Post
                        customClass={styles.post}
                        post={{ ...post, user: profile }}
                      />
                    ))
                  : ""}
              </section>
            </div>
          </main>
        </div>
      )}
    </div>
  ) : (
    ""
  );
}
