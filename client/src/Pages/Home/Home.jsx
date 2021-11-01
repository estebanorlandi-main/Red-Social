import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import Post from "../../components/Post/Post";
import NewPost from "../../components/NewPost/NewPost";

import styles from "./Home.module.css";

function Home(props) {
  const posts = useSelector((state) => state.postsReducer.posts);

  const [page, setPage] = useState(0);
  const [createPost, setCreatePost] = useState(false);
  const [session, setSession] = useState(false);

  const handlePage = () => setPage(page + 1);

  const handleScroll = useCallback(function handleScroll() {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) handlePage();
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  console.log("total posts: ", (page + 1) * 10);

  const session1 = {
    username: "estebanorlandi4",
  };
  const session2 = {
    username: "esteban",
  };
  const noSession = {};

  return (
    <div className={createPost ? styles.noScroll : "" + ` ${styles.home}`}>
      <div>
        <button onClick={() => setCreatePost((old) => !old)}>
          Create Post
        </button>
      </div>

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

      <button
        onClick={() => {
          console.log(session ? session1 : session2);
          setSession((old) => !old);
        }}
      >
        change user
      </button>
      <ul>
        {posts.map((post, i) =>
          i < (page + 1) * 10 ? (
            <li>
              <Post post={post} session={session ? session1 : session2} />
            </li>
          ) : (
            ""
          )
        )}
      </ul>
      <div className={styles.cargando}>Cargando...</div>
    </div>
  );
}

export default Home;
