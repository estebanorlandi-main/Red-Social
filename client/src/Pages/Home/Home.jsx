import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import NewPost from "../../components/NewPost/NewPost";
import UserCard from "../../components/UserCard/UserCard";

import styles from "./Home.module.css";
import { getPosts, updatePage } from "../../Redux/actions/Post";

function Home(props) {
  const posts = useSelector((state) => state.postsReducer.posts);
  const user = useSelector((state) => state.sessionReducer);
  const page = useSelector((state) => state.postsReducer.page);
  const dispatch = useDispatch();

  const [createPost, setCreatePost] = useState(false);
  const [first, setFirst] = useState(true);

  const handleScroll = useCallback(() => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight
    )
      dispatch(updatePage(false))
  }, [page]);
  console.log(posts)
  useEffect(() => {
    console.log("entre")
    if (first) {
      dispatch(getPosts(0));
      setFirst(false);
      return
    }
    if (page === -1) {
      window.scroll(0,0)
      dispatch(updatePage(false))
      return}
    dispatch(getPosts(page));
  }, [dispatch, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={createPost ? styles.noScroll : ` ${styles.home}`}>
      <UserCard />

      {user && user.username ? (
        <div className={styles.newPostBtn}>
          <button onClick={() => setCreatePost((old) => !old)}>
            Create Post
          </button>
        </div>
      ) : (
        <div></div>
      )}

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

      <ul>
        {posts.map((post, i) => (
          <li>
            <Post post={post} />
          </li>
        ))}
      </ul>
      <div className={styles.cargando}>Cargando...</div>
    </div>
  );
}

export default Home;
