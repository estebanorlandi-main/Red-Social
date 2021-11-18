import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../Post/Post"
import { NavLink, useHistory } from "react-router-dom";
import {
  getPostForId
} from "../../Redux/actions/Post";
import { getUser, socketConnection } from "../../Redux/actions/Users";

import styles from "./EspecificPost.module.css";

// CodeMirror
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/theme/dracula.css";
import "codemirror/keymap/vim";
import "codemirror/keymap/sublime";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const parseContent = (text) => {
  const mentions = text && text.match(/@\w+/gi);

  if (!mentions) return [text];

  const parsed = text.split(" ").map((value) => {
    if (mentions.includes(value)) {
      return (
        <NavLink
          activeClassName={styles.active}
          className={styles.mention}
          to={`/profile/${value.slice(1, value.length)}`}
        >
          {value}
        </NavLink>
      );
    } else return " " + value + " ";
  });

  return parsed;
};

function EspecificPost({customClass, user, admin, type, match }) {
  const post = useSelector((state) => state.postsReducer.post);
  const session = useSelector((state) => state.sessionReducer);

  const socket = useSelector((state) => state.usersReducer.socket);
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log("xd")
  }, [dispatch, post])
  return(
    <>
      <Post post={post} socket={socket} maxComments={true}/>
    </>
  );
}

export default EspecificPost;
