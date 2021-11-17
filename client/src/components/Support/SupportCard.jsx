import React from "react";
import { NavLink } from "react-router-dom";
import { deleteMessageSupport } from "../../Redux/actions/Support";

import styles from "../Admin/UserCardAdmin/UserAdminStyles.css";

import image from "../../images/userCard.svg";
import { useDispatch } from "react-redux";

export default function SupportUserCard({
  message,
  showName,
  showImage,
  toLeft,
  toRight,
  small,
}) {

  const dispatch = useDispatch()
  const createdAt = new Date(message.updatedAt).getTime();
  const now = new Date().getTime();
  const TimeSpan = Math.round(Math.abs(now - createdAt) / 36e5);
  const other=`Reported ${TimeSpan}hr ago`

  const ImgElement = (
    <img
      className={message.image ? "" : styles.noImage}
      src={message.image || image}
      alt=""
    />
  );
  const handleDelete = ()=> {
    
    console.log(message.idSupport)
    dispatch(deleteMessageSupport(message.idSupport))
  }

  return (
    <div className={`${styles.container} ${small ? styles.small : ""}`}>
      {toRight && showImage && ImgElement}
      <div className={styles.column}>
        {showName && <span className={styles.username}>{message.username}</span>}
        {other && <span className={styles.other}>{other}</span>}
      </div>
      {toLeft && showImage && ImgElement}
      <div>{message.title}</div>
      <div>{message.content}</div>
      <NavLink
        activeClassName={styles.active}
        className={styles.userContainer}
        to={`/profileAdmin/${message.userReported}`}
      >
      <div>User reported: {message.userReported}</div>
      </NavLink>
    <button onClick={ ()=> handleDelete()}>Delete</button>
    </div>
  )
}
