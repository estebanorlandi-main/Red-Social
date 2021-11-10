import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import NewPost from "../../components/NewPost/NewPost";
import UserCard from "../../components/UserCard/UserCard";

import styles from "./Home.module.css";
import { clearPosts, getPosts, updatePage } from "../../Redux/actions/Post";

function Home(props) {
  const posts = useSelector((state) => state.postsReducer.posts);
  const [page, totalPages] = useSelector(
    ({ postsReducer: { page, totalPages } }) => [page, totalPages]
  );

  const dispatch = useDispatch();

  const [createPost, setCreatePost] = useState(false);
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

          {totalPages > page && (
            <li>
              <div className={styles.cargando}>Cargando...</div>
            </li>
          )}
        </ul>
      </section>

      <section>
        <div>algo</div>
      </section>
    </div>
  );
}

export default Home;
