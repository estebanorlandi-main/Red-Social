import { Link } from "react-router-dom";
import styles from "./Comment.module.css";

function Comment({ comment }) {
  return (
    <li className={styles.comment}>
      <Link className={styles.user} to={`/profile/${comment.user.username}`}>
        <img className={styles.userImage} src={comment.user.image} alt="" />
        <h4>{comment.user.username}</h4>
      </Link>
      <p>{comment.content}</p>
    </li>
  );
}

export default Comment;
