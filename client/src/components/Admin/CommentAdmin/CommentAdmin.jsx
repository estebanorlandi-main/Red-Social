import { Link } from "react-router-dom";
import image from "../../../images/userCard.svg";
import styles from "./CommentAdmin.module.css";
import { IoBan} from "react-icons/io5";


function CommentAdmin({ comment,handleBanComment }) {
  return (
    <li className={styles.comment}>
      <Link className={styles.user} to={`/profile/${comment.user.username}`}>
        <img
          className={styles.userImage}
          src={comment.user.image || image}
          alt=""
        />
        <h4>{comment.user.username}</h4>

        <button className={`${styles.btnBan}`} value={comment.id} onClick={(e) => handleBanComment(e)}>
        <IoBan style={{ color: "#fff" }} />
          ban</button>
      </Link>
      <p>{comment.content}</p>
    </li>
  );
}

export default CommentAdmin;
      // <button value={comment.id} onClick={(e) => handleBanComment(e)}>ban</button>