import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import styles from "./Post.module.css";
import Comment from "../Comment/Comment";

function Post({ post }) {
  const [firstLoad, setFirstLoad] = useState(true);

  const [seeMore, setSeeMore] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    }
  });

  post.tags = post.tags.filter((tag) => !!tag);

  return (
    <div className={styles.container}>
      <ul className={styles.tags}>
        {post.tags.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>

      <div className={styles.userContainer}>
        <img src={post.creator.avatar} />
        <div>
          <span>{post.creator.username}</span>
          <span>{post.creator.username}</span>
        </div>
      </div>

      <h3>{post.title}</h3>

      <div
        className={styles.mainContent + ` ${seeMore ? styles.expand : ""}`}
        style={seeMore ? { overflowY: "visible" } : { overflowY: "hidden" }}
      >
        <p
          className={styles.text}
          style={seeMore ? { marginBottom: "1em" } : { marginBottom: "0" }}
        >
          {post.text}
        </p>
        <button
          className={styles.seeMore}
          style={seeMore ? { bottom: "-.5em" } : { bottom: "0" }}
          onClick={() => setSeeMore((old) => !old)}
        >
          {seeMore ? "...See less" : "...See more"}
        </button>
      </div>

      <img className={styles.postImage} src={post.image} />

      <div className={styles.options}>
        <button>Like {post.likes}</button>
        <button onClick={() => setShowComments((old) => !old)}>
          Comments {post.comments.length}
        </button>
        <button>Share</button>
      </div>

      {showComments ? (
        <ul className={styles.comments}>
          {/* 

          cuando el usuario este logeado mostrar input 
          {user.sesion ? <NuevoComentario />: ''} 

        */}

          <Comment comment={post.comments[0]} />
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}

export default Post;
