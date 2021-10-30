import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import styles from "./Post.module.css";
import Comment from "../Comment/Comment";

function Post({ post }) {
  const [firstLoad, setFirstLoad] = useState(true);

  const [seeMore, setSeeMore] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    }
  });

  const handleComment = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newComment);
  };

  post.tags = post.tags.filter((tag) => !!tag);

  return (
    <div className={styles.container}>
      <ul className={styles.tags}>
        {post.tags.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>
      <div className={styles.userContainer}>
        <img className={styles.avatar} src={post.creator.avatar} />
        <div>
          <span className={styles.username}>{post.creator.username}</span>
          <span className={styles.github}>{post.creator.username}</span>
        </div>
      </div>
      <div className={styles.postBody}>
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
            style={seeMore ? { bottom: "-2em" } : { bottom: "0" }}
            onClick={() => setSeeMore((old) => !old)}
          >
            {seeMore ? "...See less" : "...See more"}
          </button>
        </div>
      </div>
      {post.image ? <img className={styles.postImage} src={post.image} /> : ""}
      <div className={styles.options}>
        <button>L {post.likes}</button>
        <button>C {post.comments.length}</button>
        <button>Share</button>
      </div>
      {/* 
        cuando el usuario este logeado mostrar input 
        {user.sesion ? <NuevoComentario />: ''} 
      */}

      <span className={styles.maxLength}>{newComment.length} / 1000</span>
      <form className={styles.newComment} onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          onChange={handleComment}
          name="text"
          value={newComment}
        />
        <button type="submit"> Submit </button>
      </form>
      <Comment comment={post.comments[0]} />
    </div>
  );
}

export default Post;
