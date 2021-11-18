import { format } from "timeago.js";
import styles from "./Message.module.css";
import avatar from "../../images/userCard.svg";
import { useEffect, useState } from "react";

export default function Message({ message, own, sender, receiver }) {
  const [image, setImage] = useState(null);
  
  useEffect(() => {
    if(sender && receiver){
      own ? setImage(sender.image) : setImage(receiver.image)
    }
  },[message])

  return (
    <div className={own ? styles.messageOwn : styles.message}>
      <div className={styles.messageTop}>
        <img className={styles.messageImg} src={image ? image : avatar} alt="" />
        <p className={styles.messageText}>{message.text}</p>
      </div>
      <div className={styles.messageBottom}>{format(message.createdAt)}</div>
    </div>
  );
}

