import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NewPost from "../../components/NewPost/NewPost";

import styles from "./UserCard.module.css";
import person from "../../images/personWithPC.png";
import { BiLogIn } from "react-icons/bi";
import userimg from "../../images/userCard.png";

export default function UserCard() {
  const user = useSelector((state) => state.sessionReducer);
  const [createPost, setCreatePost] = useState(false);

  return (
    <div className={styles.container}>
      {user && user.username ? (
        <div>
          <div className={styles.bkg}></div>
          <div className={styles.profile}>
            <img src={userimg} width="60px" />
          </div>
          <div className={styles.username}>{user.username}</div>
          <hr></hr>
        </div>
      ) : (
        <div>
          <img src={person} alt="Person chating in computer" />
          <span>
            Find, connect and share with people with the same passion as you!
          </span>
          <hr></hr>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <button>
              <span>Create a new acount</span>
            </button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button style={{ marginTop: "8%" }}>
              <span>Enter to your account</span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

