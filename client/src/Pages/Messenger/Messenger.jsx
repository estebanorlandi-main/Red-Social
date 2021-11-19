import Conversation from "../../components/Conversations/Conversations.jsx";
import Message from "../../components/Message/Message.jsx";
import ChatOnline from "../../components/ChatOnline/ChatOnline.jsx";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socketConnection, getUser, removeProfile } from "../../Redux/actions/Users";
import { setUntrackMessages } from "../../Redux/actions/Message.js";
import avatar from "../../images/userCard.svg";
import UserCard from "../../components/UserCard/UserCard.jsx";

import axios from "axios";

import styles from "./Messenger.module.css";

export default function Messenger() {
  const user = useSelector((store) => store.sessionReducer);
  const socket = useSelector((state) => state.usersReducer.socket);
  const profile = useSelector((state) => state.usersReducer.profile);
  // console.log(profile)

  const dispatch = useDispatch();

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([]);
  const [untrackMessages, setUntrackMessages] = useState({})
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const scrollRef = useRef();

  // console.log(currentChat)
  // console.log(untrackMessages)
  // console.log(onlineUsers)

  useEffect(() => {
    dispatch(getUser(user?.username));
    return () => dispatch(removeProfile());
  }, [dispatch, user.username]);

  useEffect(() => {
    if (!Object.keys(socket).length) {
      dispatch(socketConnection(user.username));
    }
  }, [dispatch, socket, user.username]);

  useEffect(() => {
    const friendId = currentChat?.members.find(
      (m) => m !== user.username
    );

    const getUser = async () => {
      try {
        const res = await axios(`http://localhost:3001/user/${friendId}`);
        setReceiver(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [user, currentChat]);

  useEffect(() => {
    if (Object.keys(socket).length) {
      socket.on("getMessage", (data) => {

        // console.log(data)

        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }
  }, [socket]);

  // useEffect(() => {
  //   if(Object.keys(socket).length){
  //     socket.on("getUntrackMessage", (data) => {

  //       console.log(data.untrack)
  //       console.log(data.conversationId)

  //       // dispatch(setUntrackMessages(data));
        
  //     });
  //   } 
  // }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    if (Object.keys(socket).length) {
      socket.emit("onlineUsers", user.username);

      socket.on("getOnlineUsers", (users) => {
      
        if(profile){
          setOnlineUsers(
            profile.following?.filter((foll) => users.some((u) => u.userId === foll.username))
          );
        }
        
      });
    }
  }, []);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/conversation/" + user.username
        );
        // console.log(res.data);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.username]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        //console.log(currentChat.id);
        const res = await axios.get(
          "http://localhost:3001/message/" + currentChat?.id
        );
        setMessages(res.data);

      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);


  useEffect(() => {
    const readMessages = async () => {
      try {
        //console.log(currentChat.id);  

        const read = await axios.get(
          `http://localhost:3001/message/read/${currentChat?.id}/${user.username}`
        );

        const untrack = await axios.get(
          `http://localhost:3001/message/untrack/${currentChat?.id}/${user.username}`
        );
         
          if(untrack.data){
            const receiver = currentChat?.members.find(
              (m) => m !== user.username
            );
            
            socket.emit("untrackMessage", {
              receiverId: receiver,
              data: untrack.data,
              conversationId: currentChat?.id
            });

          }
        

      } catch (err) {
        console.log(err);
      }
    };
    readMessages();
  }, [messages]);


  const handleChange = async (e) => {
    setInput(e.target.value.replace(/\s+/g, ''))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.username,
      text: newMessage,
      conversationId: currentChat.id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user.username
    );

    socket.emit("sendMessage", {
      senderId: user.username,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:3001/message/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className={styles.messenger}>
        <div className={styles.chatMenu}>
          <div className={styles.chatMenuWrapper}>
            <input
              placeholder="Search for friends"
              className={styles.chatMenuInput}
              value={input}
              onChange={handleChange}
            />
            {conversations.filter(
              conver => {
                if(input){
                  if(conver.members.filter( member =>
                    member.includes(input)).length){
                   return conver
                  }
                } else{
                  return conver
                }
              }
            ).map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.chatBox}>
          <div className={styles.chatBoxWrapper}>
            {currentChat ? (
              <>
                <div className={styles.chatUserReceiver}>
                  {
                    receiver ? 
                    <div>
                      <div style={{display:"flex", alignItems:"center", paddingBottom:"0.5em"}}>
                      <img
                        className={styles.conversationImg}
                        src={
                          receiver?.image
                            ? `data:${receiver.image?.imageType};base64, ${receiver.image?.imageData}`
                            : avatar
                        }
                        alt=""
                      />
                      <span className={styles.conversationName}>{receiver.username}</span>
                      </div>
                      <hr style={{width:'40em'}}></hr>
                    </div> 
                    : 
                    <></>
                  }
                </div>
                <div className={styles.chatBoxTop}>
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} sender={user} receiver={receiver} own={m.sender === user.username} />
                    </div>
                  ))}
                </div>
                <div className={styles.chatBoxBottom}>
                  <textarea
                    className={styles.chatMessageInput}
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className={styles.chatSubmitButton}
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className={styles.noConversationText}>
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className={styles.chatOnline}>
          <div className={styles.chatOnlineWrapper}>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user.username}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
