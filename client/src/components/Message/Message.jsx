import { format } from "timeago.js";
import styles from "./Message.module.css";
import avatar from "../../images/userCard.svg";

export default function Message({ message, own }) {
  return (
    <div className={own ? styles.messageOwn : styles.message}>
      <div className={styles.messageTop}>
        <img className={styles.messageImg} src={avatar} alt="" />
        <p className={styles.messageText}>{message.text}</p>
      </div>
      <div className={styles.messageBottom}>{format(message.createdAt)}</div>
    </div>
  );
}

