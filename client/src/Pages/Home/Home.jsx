import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import NewPost from "../../components/NewPost/NewPost";
//import UserCard from "../../components/UserCard/UserCard";

import { Link } from "react-router-dom";

import styles from "./Home.module.css";
import { clearPosts, getPosts, updatePage } from "../../Redux/actions/Post";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

function Home(props) {
  const posts = useSelector((state) => state.postsReducer.posts);
  const session = useSelector((state) => state.sessionReducer);
  const [page, totalPages] = useSelector(
    ({ postsReducer: { page, totalPages } }) => [page, totalPages]
  );

  const dispatch = useDispatch();

  const [createPost, setCreatePost] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [first, setFirst] = useState(true);

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
    dispatch(getPosts(page));
  }, [dispatch, page, first, totalPages]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/conversation/" + session.username
        );
        console.log(res.data);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [session.username]);

  return (
    <div className={styles.home + ` ${createPost ? styles.noScroll : ""} `}>
      <section>
        <div className={styles.filters}>
          <h3>Tags</h3>
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

      <section className={styles.sectionPosts}>
        <ul>
          <li>
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
              <img className="avatar" src={session.image} alt="" />
              <button
                className={styles.createPost}
                onClick={() => setCreatePost(true)}
              >
                Create Post
              </button>
            </div>
          </li>
          {posts.map((post, i) => (
            <li key={i}>
              <Post post={post} />
            </li>
          ))}

          {totalPages > page && (
            <li>
              <div className={styles.cargando}>Cargando...</div>
            </li>
          )}
        </ul>
      </section>

      <section>
        <div>
          <h3>Friends</h3>
          <ul>
            <li></li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;
