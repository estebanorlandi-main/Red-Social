import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import styles from "./Conversations.module.css";
import avatar from "../../images/userCard.svg";

export default function Conversation({ conversation, currentUser }) {
  const socket = useSelector((state) => state.usersReducer.socket)

  const [user, setUser] = useState(null);
  const [untrackMessages, setUntrackMessages] = useState([])
  // console.log(untrackMessages)

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

  useEffect(() => {
    if(Object.keys(socket).length){
      socket.on("getUntrackMessage", (data) => {

        console.log(data.untrack)
        console.log(data.conversationId)

        if(conversation.id === data.conversationId){
          setUntrackMessages(data.untrack)
        }
      });
    } 
  }, []);

  return (
    <div className={styles.conversation}>
      <img
        className={styles.conversationImg}
        src={user?.image ? user.image : avatar}
        alt=""
      />
      <span className={styles.conversationName}>{user?.username}</span>
      {untrackMessages.length > 0 && (
        <div className={styles.counter}>{untrackMessages.length}</div>
      )}
    </div>
  );
}
