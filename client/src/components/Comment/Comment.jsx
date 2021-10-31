import { Link } from "react-router-dom";
import styles from "./Comment.module.css";

function Comment({ comment }) {
  return (
    <li className={styles.comment}>
      <Link to={`/profile/${comment.user.username}`}>
        <h4>{comment.user.username}</h4>
      </Link>
      <p>{comment.text}</p>
    </li>
  );
}

export default Comment;
