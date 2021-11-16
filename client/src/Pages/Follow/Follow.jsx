import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {followUnfollow } from "../../Redux/actions/Users";
// import { io } from "socket.io-client";
// import { conversation, updateUser } from "../../Redux/actions/Session";
import styles from "./Follow.module.css";
// import { Link } from "react-router-dom";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPersonXFill } from "react-icons/bs";

export default function Follow({props}) {
  const { socket } = props
  const [Follow, SetFollow] = useState("")
  

  useEffect(()=>{
    if(socket.on){
      socket.on("getFollows", (data)=>{
        SetFollow(data)
      })      
    }

  },[])

  const {followers,following} = props
  return (
    <div className={styles.container}>
      <span><strong>{following?.length}</strong> Followers</span>
      <span>&nbsp;&nbsp;</span>
      <span><strong>{followers?.length}</strong> Following</span>        
    </div>
    );
}

export function FollowBtn({props}){
  const {user, follow, info, socket} = props 

  const $follows = info.some(e=> e.username === user)

  const [Follow, SetFollow] = useState($follows)

  const dispatch = useDispatch()

  const handleClick = async (e) => {
    if(!user || !follow) return
    await dispatch(followUnfollow({user,follow}))
    // io.emit("setFollows", ()=>Follow)
    SetFollow(!Follow)
    socket.emit("setFollows", Follow)
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerBtn}>
        <button onClick={(e)=> handleClick(e)} className={Follow? styles.unfollow: styles.follow}>
          {Follow === true? <span><BsFillPersonXFill style={{ color: "#fff" }}  className={styles.icon}/> Unfollow</span>: <span><BsFillPersonPlusFill style={{ color: "#fff" }} className={styles.icon}/> Follow</span>}
        </button> 
      </div>
    </div>
    );
}
