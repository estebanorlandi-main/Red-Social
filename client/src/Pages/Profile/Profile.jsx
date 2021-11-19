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
import { IoMdMail } from "react-icons/io";
import { BsGithub } from "react-icons/bs";

import { MdMessage } from "react-icons/md";

import Tags from "../../components/Tags/Tags";

// cambiar a estado traido de la DB

export default function Profile(props) {
  const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

  const dispatch = useDispatch();
  const history = useHistory();
  const [editar, setEditar] = useState(false);

  const session = useSelector((state) => state.sessionReducer);
  const profile = useSelector((state) => state.usersReducer.profile);
  console.log(profile);
  const isDark = useSelector((state) => state.themeReducer.theme);
  const [followersOnline, setFollowersOnline] = useState(null);

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
            URL + "/conversation/" + session.username
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
        dispatch(conversation(session.username, profile.username));
        history.push("/messenger");
      }
    }
  };

  let git = profile.gitaccount && profile.gitaccount.split("/");
  git = git && git[git.length - 1];

  console.log(profile);
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
        <div className={`${styles.profile} ${isDark ? styles.dark : ""}`}>
          <section className={styles.head}>
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
                    <h1 className={styles.name}>
                      {profile.name} {profile.lastname}
                    </h1>
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
          </section>
          <main className={styles.container}>
            <div className={styles.left}>
              <section>
                <h3>About</h3>

                <div>
                  <p className={styles.about}>{profile.about}</p>
                  <hr></hr>

                  <a href={`mailto:${profile.email}`} className={styles.email}>
                    <IoMdMail
                      style={{
                        marginRight: "4px",
                        width: "1.2em",
                        height: "1.2em",
                      }}
                    />
                    {profile.email}{" "}
                  </a>
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
                  {profile.tags ? (
                    <>
                      <h4 style={{ marginTop: "2em", marginBottom: "1em" }}>
                        Tags
                      </h4>
                      <div className={styles.tags}>
                        <Tags tags={profile.tags} />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </section>
              <section>
                <h3>Recomendations</h3>
              </section>
            </div>
            <div className={styles.right}>
              <section className={styles.posts}>
                {profile.posts
                  ? profile.posts.map((post) => (
                      <Post customClass={styles.post} post={post} />
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
