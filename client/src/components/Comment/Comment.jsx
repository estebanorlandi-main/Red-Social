import { Link } from "react-router-dom";
import image from "../../images/userCard.svg";
import styles from "./Comment.module.css";

function Comment({ comment, type }) {
  return (
    <li className={styles.comment}>
      <Link className={styles.user} to={`/profile/${comment.user.username}`}>
        <img
          className={styles.userImage}
          src={comment.user.image || image}
          alt=""
        />
        <h4>{comment.user.username}</h4>
        {type !== "challenge" ? (
          <p>{comment.content}</p>
        ) : (
          <Link to={{ pathname: "/challenge/comment", value: comment.content }}>
            Show Results
          </Link>
        )}
      </Link>
    </li>
  );
}

export default Comment;
