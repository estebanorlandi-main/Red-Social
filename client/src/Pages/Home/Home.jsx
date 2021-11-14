import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import NewPost from "../../components/NewPost/NewPost";
import { io, Socket } from "socket.io-client";
import UserCard from "../../components/UserCard/UserCard";

import { Link } from "react-router-dom";
import Select from "react-select";
import styles from "./Home.module.css";
import { clearPosts, getPosts, updatePage, uploadTags } from "../../Redux/actions/Post";
import axios from "axios";
import { socketConnection } from "../../Redux/actions/Users";
function Home(props) {
  const posts = useSelector((state) => state.postsReducer.posts);
  const allTags = useSelector((state) => state.postsReducer.tags);
  const session = useSelector((state) => state.sessionReducer);

  const socket = useSelector((state) => state.usersReducer.socket);
  // console.log(socket);
  const [page, totalPages] = useSelector(
    ({ postsReducer: { page, totalPages } }) => [page, totalPages]
  );
  const dispatch = useDispatch();
  const [orden, setOrden] = useState("cronologico")
  const [createPost, setCreatePost] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [first, setFirst] = useState(true);
  const [tags, setTags] = useState([])
  const [tagsOptions, setTagsOptions] = useState([])//El select no funciona sin un array de objetos con value y label
  const options = [
    { value: "cronologico", label: "Cronologico" },
    { value: "userLikes", label: "Likes" },
    { value: "comments", label: "Comentarios" },
    { value: "combinados", label: "Inicial"}
  ];
  console.log(tagsOptions, allTags)
  useEffect(() => {
    dispatch(socketConnection(session.username));
  }, []);

  // useEffect(() => {
  //   if(Object.keys(socket).length){
  //     socket.emit("addUser", session.username);
  //   }
  // }, [socket, session.username]);
  const handleScroll = useCallback(() => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight
    )
      dispatch(updatePage(page + 1 < totalPages ? page + 1 : page));
  }, [dispatch, page, totalPages]);

  useEffect(() => {
    if (page === -1) {
      window.scroll(0, 0);
      dispatch(updatePage(0));
      return;
    }
    dispatch(getPosts(page,tags, orden));
  }, [dispatch, page, first, totalPages, orden]);

  useEffect(() => {
    if (first) {
      dispatch(uploadTags())
      setFirst(false)
    }
    setTagsOptions(allTags.map((tag) => {return ({value: tag.label, label: tag.label})}))
  }, [allTags])
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleSelect = (e) => {
    console.log(e)
    setOrden(e.value);
  };
  const handleSelect2 = (e) => {
    console.log(e)
    setTags(e.map((option) => option.value));
  };

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/conversation/" + session.username
        );
        setConversations(res.data);
      } catch (err) {}
    };
    getConversations();
  }, [session.username]);

  return (
    <div className={styles.home + ` ${createPost ? styles.noScroll : ""} `}>
      <section className={styles.left}>
        <div className={styles.filters}>
          <h3>My tags</h3>
          <ul className={styles.tags}>
            {session.tags && session.tags.length ? (
              session.tags.map((tag, i) => (
                <li key={i}>
                  <Link className={styles.tag} to="/home">
                    # {tag}
                  </Link>
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
        </div>
      </section>

      <section className={styles.center}>
        {createPost ? (
          <div
            className={styles.newPost}
            id="close"
            onClick={(e) =>
              e.target.id === "close" ? setCreatePost((old) => false) : ""
            }
          >
            <NewPost />
          </div>
        ) : (
          ""
        )}

        <div className={styles.newPostOpen}>
          <UserCard
            toRight
            showImage
            user={{ user: session.username, image: session.image }}
          />
          <button
            className={styles.createPost}
            onClick={() => setCreatePost(true)}
          >
            Create Post
          </button>
        </div>

            <div className={styles.newPostOpen}>
              <UserCard toRight showImage />
              <button
                className={styles.createPost}
                onClick={() => setCreatePost(true)}
              >
                Create Post
              </button>
            </div>
          <ul>
          <li>
            <Select onChange={handleSelect} options={options} />
          </li>
          <li>
            <Select onChange={handleSelect2} options={tagsOptions} isMulti/>
          </li>
          {posts.map((post, i) => (
            <li key={i}>
              <Post post={post} socket={socket} />
            </li>
          ))}
        </ul>

        {totalPages > page && (
          <div className={styles.cargando}>Cargando...</div>
        )}
      </section>

      <section className={styles.right}>
        <div>
          <h3>Friends.</h3>
          <ul>
            {conversations.map(({ members }) => (
              <li>
                <p>{members.filter((member) => member !== session.username)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;
