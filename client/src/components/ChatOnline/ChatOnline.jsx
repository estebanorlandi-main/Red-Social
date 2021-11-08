import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./ChatOnline.module.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  /*
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);
  */

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/conversations/find/${currentId}/${user.username}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.chatOnline}>
      {onlineFriends.map((o) => (
        <div className={styles.chatOnlineFriend} onClick={() => handleClick(o)}>
          <div className={styles.chatOnlineImgContainer}>
            <img
              className={styles.chatOnlineImg}
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className={styles.chatOnlineBadge}></div>
          </div>
          <span className={styles.chatOnlineName}>{o?.username}</span>
        </div>
      ))}
    </div>
  );
}
