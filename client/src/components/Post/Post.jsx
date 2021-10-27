import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import styles from "./Post.module.css";

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

      {/* Add creator to Post object
      <div className={styles.userContainer}>
        <img src={post.creator.avatar} />
        <span>{post.creator.username}</span>
      </div>
      */}
      <h3>{post.title}</h3>

      <div className={styles.mainContent + ` ${seeMore ? styles.expand : ""}`}>
        <p className={styles.text}>{post.text}</p>
        {seeMore ? (
          ""
        ) : (
          <button
            className={styles.seeMore}
            onClick={() => setSeeMore((old) => !old)}
          >
            <span>...</span>See more
          </button>
        )}
      </div>

      <img className={styles.postImage} src={post.image} />

      <div className={styles.info}>
        <span>Likes: {post.likes}</span>
        <span>Comments: {/*randomComments.length*/}</span>
      </div>

      <hr />

      <div className={styles.options}>
        <button>Like</button>
        <button onClick={() => setShowComments((old) => !old)}>Comments</button>
        <button>Share</button>
      </div>

      {showComments ? (
        <ul className={styles.comments}>
          {/* 

          cuando el usuario este logeado mostrar input 
          {user.sesion ? <NuevoComentario />: ''} 

        */}

          {post.comments
            .filter((value, i) => i < 5)
            .map((comment, i) => (
              <li key={i} className={styles.comment}>
                <div className={styles.userContainer}>
                  <img src={comment.user.avatar} />
                  <span>{comment.user.username}</span>
                </div>
                <p>{comment.text}</p>
              </li>
            ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
}

export default Post;
