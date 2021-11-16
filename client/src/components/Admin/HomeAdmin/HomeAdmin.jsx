import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../Post/Post";
import PostAdmin from "../PostAdmin/PostAdmin";
import NewPost from "../../NewPost/NewPost";
import UserCardAdmin from "../UserCardAdmin/UserCardAdmin";

import styles from "./stalesAdmin.css";
import { clearPosts, getPosts, updatePage } from "../../../Redux/actions/Post";
import { FaLeaf } from "react-icons/fa";

function HomeAdmin(props) {
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
        <UserCardAdmin showPostForm={() => setCreatePost((old) => !old)} />

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
              <PostAdmin post={post} />
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

export default HomeAdmin;