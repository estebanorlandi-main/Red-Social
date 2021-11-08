import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import NewPost from "../../components/NewPost/NewPost";
import UserCard from "../../components/UserCard/UserCard";

import styles from "./Home.module.css";
import { clearPosts, getPosts, updatePage } from "../../Redux/actions/Post";

function Home(props) {
  const posts = useSelector((state) => state.postsReducer.posts);
  const page = useSelector((state) => state.postsReducer.page);
  const dispatch = useDispatch();

  const [createPost, setCreatePost] = useState(false);
  const [first, setFirst] = useState(true);

  const handleScroll = useCallback(() => {
    if (
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight
    )
      dispatch(updatePage(false));
  }, [dispatch]);
  console.log(posts)
  useEffect(() => {
    if (first) {
      dispatch(getPosts(0));
      setFirst(false);
      return;
    }
    if (page === -1) {
      window.scroll(0, 0);
      dispatch(updatePage(false));
      return;
    }
    dispatch(getPosts(page));
  }, [dispatch, page, first]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={styles.home + ` ${createPost ? styles.noScroll : ""} `}>
      <section className={styles.userCard}>
        <UserCard showPostForm={() => setCreatePost((old) => !old)} />

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
      </section>

      <section className={styles.sectionPosts}>
        <ul>
          {posts.map((post, i) => (
            <li key={i}>
              <Post post={post} />
            </li>
          ))}

          <li>
            <div className={styles.cargando}>Cargando...</div>
          </li>
        </ul>
      </section>

      <section>
        <div>algo</div>
      </section>
    </div>
  );
}

export default Home;
