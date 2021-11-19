import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../Post/Post";
import PostAdmin from "../PostAdmin/PostAdmin";
import NewPost from "../../NewPost/NewPost";
import UserCardAdmin from "../UserCardAdmin/UserCardAdmin";

import styles from "./HomeAdmin.module.css";
import { clearPosts, getPosts, updatePage,banPost,deleteComment } from "../../../Redux/actions/Post";
import { FaLeaf } from "react-icons/fa";
import { BiChevronUp } from "react-icons/bi";
import { Link } from "react-router-dom";

import { socketConnection } from "../../../Redux/actions/Users";


import axios from "axios";

function HomeAdmin(props) {
  const posts = useSelector((state) => state.postsReducer.posts);
  const session = useSelector((state) => state.sessionReducer);

  const socket = useSelector((state) => state.usersReducer.socket);
  // console.log(socket);
  const [page, totalPages] = useSelector(
    ({ postsReducer: { page, totalPages } }) => [page, totalPages]
  );

  const dispatch = useDispatch();

  const [newPosts, setNewPosts] = useState(true);
  const [createPost, setCreatePost] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [first, setFirst] = useState(true);
  const [orden, setOrden] = useState("cronologico");
  const [tags, setTags] = useState(session.tags);
  const [flags, setFlags] = useState(true)

  useEffect(() => {
    dispatch(socketConnection(session.username));
  }, [dispatch,posts,flags]);

  const handleScroll = useCallback(() => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight
    )
      dispatch(updatePage(page + 1 < totalPages ? page + 1 : page));
  }, [dispatch, page, totalPages,flags]);

  useEffect(() => {
    if (page === -1) {
      window.scroll(0, 0);
      dispatch(updatePage(0));
      return;
    }
    dispatch(getPosts(page));
  }, [dispatch, page, first, totalPages,flags]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll,flags]);

  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:3001/conversation/" + session.username
  //       );
  //       setConversations(res.data);
  //     } catch (err) {}
  //   };
  //   getConversations();
  // }, [session.username,flags]);

  const handleCharge = (e) => {
    window.scrollTo(0, 0);
    dispatch(updatePage(0));
    dispatch(getPosts(page, tags, orden));
    setNewPosts(false);
  };

  // const handleBanComment = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value)
  //   dispatch(deleteComment(e.target.value));
  //   alert('Comment deleted successfully')
  // }
  

  return (
    <div className={styles.home + ` ${createPost ? styles.noScroll : ""} `}>
      <section className={styles.center}>
        {newPosts && (
          <button className={styles.newPosts} onClick={handleCharge}>
            Check new posts <BiChevronUp className={styles.icon} />
          </button>
        )}
        <ul>
          {posts && Array.isArray(posts) ? posts.map((post, i) => (
            <li key={i}>
              <PostAdmin post={post} socket={socket}  />
            </li>
          )) : 
          <li>
          <button className={styles.newPosts} onClick={handleCharge}>
            Check new posts <BiChevronUp className={styles.icon} />
          </button>
        </li>
          
          }
        </ul>
        {/* {totalPages > page && (
          <div className={styles.cargando}>Cargando...</div>
        )} */}
      </section>
    </div>
  );
}

export default HomeAdmin;


