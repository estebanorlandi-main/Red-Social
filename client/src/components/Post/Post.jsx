import { useState } from "react";

import styles from "./Post.module.css";

function Post({ data, user, comments }) {
  const tags = data.tags.filter((tag) => !!tag);

  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        <img src={user.avatar} />
        <span>{user.username}</span>
      </div>
      <h3>{data.title}</h3>
      <p className={styles.text}>{data.text}</p>
      <ul className={styles.tags}>
        {tags.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>

      <ul className={styles.comments}>
        {/* 

          cuando el usuario este logeado mostrar input 
          {user.sesion ? <NuevoComentario />: ''} 

        */}
        {comments.map((comment) => (
          <li>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
