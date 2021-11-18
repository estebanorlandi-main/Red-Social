import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./ChatOnline.module.css";
import avatar from "../../images/userCard.svg";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/conversation/find/${currentId}/${user.username}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.chatOnline}>
      <h4>Online Users</h4>
      {onlineUsers?.map((online) => (
        <div className={styles.chatOnlineFriend} onClick={() => handleClick(online)}>
          <div className={styles.chatOnlineImgContainer}>
            <img
              className={styles.chatOnlineImg}
              src={
                online?.image
                  ? online.image
                  : avatar
              }
              alt=""
            />
            <div className={styles.chatOnlineBadge}></div>
          </div>
          <span className={styles.chatOnlineName}>{online?.username}</span>
        </div>
      ))}
    </div>
  );
}
