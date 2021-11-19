import Conversation from "../../components/Conversations/Conversations.jsx";
import ChatOnline from "../../components/ChatOnline/ChatOnline.jsx";
import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import avatar from "../../images/userCard.svg";
import { BiMessageAltDetail } from "react-icons/bi";

import axios from "axios";

import styles from "./DisplayConversations.module.css";

export default function DisplayConversations() {
  const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

  const [conversations, setConversations] = useState([]);
  const [input, setInput] = useState("");
  const [popup, setPopup] = useState(false);
  const history = useHistory();
  const isMessenger = useLocation().pathname === "/messenger";

  const user = useSelector((store) => store.sessionReducer);

  const handleClick = (e) => {
    if (!isMessenger) {
      setPopup(!popup);
    }
  };

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          URL + "/conversation/" + user.username
        );
        // console.log(res.data);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.username]);

  const handleChange = async (e) => {
    setInput(e.target.value.replace(/\s+/g, ""));
  };

  return (
    <div className={styles.container}>
      <div onClick={handleClick} className={styles.display}>
        <BiMessageAltDetail
          style={{ margin: "0", width: "1.5em", height: "1.5em" }}
        />
        <span>Messages</span>
      </div>

      {!popup ? (
        <></>
      ) : (
        <div className={styles.conversations}>
          <hr></hr>
          <div className={styles.chatMenuWrapper}>
            <input
              placeholder="Search for friends"
              className={styles.chatMenuInput}
              value={input}
              onChange={handleChange}
            />
            {conversations?.length ?
              conversations.filter((conver) => {
                if (input) {
                  if (
                    conver.members.filter((member) => member.includes(input))
                      .length
                  ) {
                    return conver;
                  }
                } else {
                  return conver;
                }
              })
              .map((c) => (
                <div
                  onClick={() => {
                    history.push("/messenger");
                    setPopup(false);
                  }}
                >
                  <Conversation conversation={c} currentUser={user} />
                </div>
              ))
              :
              <div className={styles.noConversations}>Ups, you have no conversation yet {':('} <br></br> Send a message to a user!</div>
              }
          </div>
        </div>
      )}
    </div>
  );
}

