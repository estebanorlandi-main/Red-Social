import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import styles from "./Post.module.css";

function Post(props) {
  const [firstLoad, setFirstLoad] = useState(true);

  const [randomPost, setRandomPost] = useState(0);
  const [randomComments, setRandomComments] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [posts, users, comments] = useSelector((state) => [
    state.posteos,
    state.users,
    state.comments,
  ]);

  useEffect(() => {
    if (firstLoad) {
      setRandomComments(comments.filter(() => Math.round(Math.random())));
      setRandomPost(Math.floor(Math.random()) * 999);
      setFirstLoad(false);
    }
  });

  const randomUser = () => Math.floor(Math.random() * 999);

  const postTags = posts[randomPost].tags.filter((tag) => !!tag);

  return (
    <div className={styles.container}>
      <ul className={styles.tags}>
        {postTags.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>

      <div className={styles.userContainer}>
        <img src={users[randomUser()].avatar} />
        <span>{users[randomUser()].username}</span>
      </div>

      <h3>{posts[randomPost].title}</h3>

      <div className={styles.mainContent + ` ${seeMore ? styles.expand : ""}`}>
        <p className={styles.text}>{posts[randomPost].text}</p>
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

      <img className={styles.postImage} src={posts[randomPost].image} />

      <div className={styles.info}>
        <span>Likes: {posts[randomPost].likes}</span>
        <span>Comments: {randomComments.length}</span>
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
          {randomComments
            .filter((value, i) => i < 5)
            .map((comment, i) => (
              <li className={styles.comment}>
                <div className={styles.userContainer}>
                  <img src={users[randomUser()].avatar} />
                  <span>{users[randomUser()].username}</span>
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
