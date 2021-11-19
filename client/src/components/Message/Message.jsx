import { format } from "timeago.js";
import styles from "./Message.module.css";
import avatar from "../../images/userCard.svg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserCard from "../UserCard/UserCard";

export default function Message({ message, own, sender, receiver }) {
  const [image, setImage] = useState(null);
  const isDark = useSelector((state) => state.themeReducer.theme);

  useEffect(() => {
    if (own && sender) {
      setImage({ data: sender.image.imageData, type: sender.image.imageType });
    } else if (receiver) {
      setImage({
        data: receiver.image.imageData,
        type: receiver.image.imageType,
      });
    }
  }, [message, receiver]);

  return (
    <div
      className={` 
        ${own ? styles.messageOwn : styles.message} ${
        isDark ? styles.dark : ""
      }`}
    >
      <div className={styles.messageTop}>
        <img
          className={styles.messageImg}
          src={image ? `data:${image.type};base64, ${image.data}` : avatar}
          alt=""
        />
        <p className={styles.messageText}>{message.text}</p>
      </div>
      <div className={styles.messageBottom}>{format(message.createdAt)}</div>
    </div>
  );
}
