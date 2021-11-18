import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import UserCard from "../UserCard/UserCard";
import styles from "./Comment.module.css";

function Comment({ comment, type }) {
  const user = useSelector((store) => store.sessionReducer);
  const isDark = useSelector((store) => store.themeReducer.theme);

  return (
    <li className={`${styles.comment} ${isDark ? styles.dark : ""}`}>
      <Link className={styles.user} to={`/profile/${comment.user.username}`}>
        <UserCard
          toRight
          showName
          showImage
          user={{ username: user.username, image: user.image }}
        />
      </Link>

      {type !== "challenge" ? (
        <p>{comment.content}</p>
      ) : (
        <Link to={{ pathname: "/challenge/comment", value: comment.content }}>
          Show Results...
        </Link>
      )}
    </li>
  );
}

export default Comment;
