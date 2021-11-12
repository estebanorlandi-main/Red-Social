import { useState, useEffect } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from './Notification.module.css'
import image from "../../images/userCard.svg";

export default function Notification({notification}){
    let action;

    if (notification.type === 1) {
      action = "liked";
    } else if (notification.type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }


    return (
      <div  className={styles.notification}>
     <img src={notification.userImage || image}  className={styles.img}/>
     <span style={{fontWeight:'500', marginLeft:'4px', marginRight:'4px'}}>{`${notification.senderName}`}</span>
     <span>{` ${action} your post.`}</span>
      </div>
      
    )
}
