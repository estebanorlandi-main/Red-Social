import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import Post from "../../components/Post/Post";
import NewPost from "../../components/NewPost/NewPost";

import styles from "./Home.module.css";

function Home(props) {
  const posts = useSelector((state) => state.posts);
  const [page, setPage] = useState(0);

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
  return (
    <div>
      <NewPost />
      <ul>
        {posts.map((post, i) =>
          i < (page + 1) * 10 ? (
            <li>
              <Post post={post} />
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