import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Conversations.module.css";
import avatar from "../../images/userCard.svg";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(
      (m) => m !== currentUser.username
    );

    const getUser = async () => {
      try {
        const res = await axios(`http://localhost:3001/user/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className={styles.conversation}>
      <img
        className={styles.conversationImg}
        src={user?.image ? user.image : avatar}
        alt=""
      />
      <span className={styles.conversationName}>{user?.username}</span>
    </div>
  );
}
