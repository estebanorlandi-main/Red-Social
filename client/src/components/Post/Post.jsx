import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import styles from "./Post.module.css";

function Post(props) {
  const [firstLoad, setFirstLoad] = useState(true);

  const [randomPost, setRandomPost] = useState(0);
  const [randomComments, setRandomComments] = useState([]);

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

  console.log(postTags);

  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        <img src={users[randomUser()].avatar} />
        <span>{users[randomUser()].username}</span>
      </div>
      <h3>{posts[randomPost].title}</h3>
      <p className={styles.text}>{posts[randomPost].text}</p>
      <img className={styles.postImage} src={posts[randomPost].image} />

      <ul className={styles.tags}>
        {postTags.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>

      <span>Likes: {posts[randomPost].likes}</span>

      <ul className={styles.comments}>
        {/* 

          cuando el usuario este logeado mostrar input 
          {user.sesion ? <NuevoComentario />: ''} 

        */}
        {randomComments
          .filter((value, i) => i < 5)
          .map((comment, i) => (
            <li>
              <div className={styles.userContainer}>
                <img src={users[randomUser()].avatar} />
                <span>{users[randomUser()].username}</span>
              </div>
              <p>{comment.text}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Post;
