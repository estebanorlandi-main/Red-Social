import styles from "./Comment.module.css";

function Comment({ comment }) {
  return (
    <li className={styles.comment}>
      <h4>{comment.user.username}</h4>
      <p>{comment.text}</p>
    </li>
  );
}

export default Comment;
