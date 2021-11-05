
import { format } from "timeago.js";
import styles from "./Message.module.css";

export default function Message({ message, own }) {
  return (
    <div className={own ? styles.messageOwn : styles.message}>
      <div className={styles.messageTop}>
        <img
          className={styles.messageImg}
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className={styles.messageText}>{message.text}</p>
      </div>
      <div className={styles.messageBottom}>{format(message.createdAt)}</div>
    </div>
  );
}