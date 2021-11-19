import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteMessageSupport } from "../../Redux/actions/Support";

import styles from "./SupportCard.module.css";

import image from "../../images/userCard.svg";
import { useDispatch } from "react-redux";

import style from "./SupportCard2.module.css";
import { BiSupport } from "react-icons/bi";



export default function SupportUserCard({
  message,
  showName,
  showImage,
  toLeft,
  toRight,
  small,
}) {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    username: "",
  });

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
    dispatch(deleteMessageSupport(message.idSupport))
  }

  return (
    <div>
    {message.title === "Report Post"? 
    <div>
      <form className={style.container}>
          <h2><BiSupport/> Support</h2>
          <section>
            {toRight && showImage && ImgElement}
          <div className={styles.column}>
          <NavLink
              activeClassName={styles.active}
              className={styles.userContainer}
              to={`/profile/${message.username}`}
            >
            {showName && <span className={styles.username}>{message.username}</span>}
            </NavLink>   
            {other && <span className={styles.other}>{other}</span>}
          </div>
          {toLeft && showImage && ImgElement}
          </section>
          <label className={style.wrapper}>
            Title
            <div className="input-group">
            <div>{message.title}</div>

            </div>    
          </label>

          {/* <div className={style.errores}>{err.username}</div> */}
          <label className={style.wrapper}>
            <NavLink
              activeClassName={styles.active}
              className={styles.userContainer}
              to={`/profileAdmin/${message.userReported}`}
            >
            <div>User reported: {message.userReported}</div>
            </NavLink>   
          </label>
          <button className={style.submit} type="submit" onClick={ ()=> handleDelete()}>
            Delete
          </button>
          </form>
    </div>
      :
      
      <div>
      <form className={style.container}>

          <h2><BiSupport/> Support</h2>
          <section>
            {toRight && showImage && ImgElement}
          <div className={styles.column}>
          <NavLink
              activeClassName={styles.active}
              className={styles.userContainer}
              to={`/profileAdmin/${message.username}`}
            >
            {showName && <span className={styles.username}>{message.username}</span>}
            </NavLink>   
            {other && <span className={styles.other}>{other}</span>}
          </div>
          {toLeft && showImage && ImgElement}
          </section>
          <label className={style.wrapper}>
            Title
            <div className="input-group">
            <div>{message.title}</div>

            </div>    
          </label>

          {/* <div className={style.errores}>{err.username}</div> */}
          <label className={style.wrapper}>
            Content
            <div className="input-group">
            <div>{message.content}</div>

            </div>   
          </label>
          <button className={style.submit} type="submit" onClick={ ()=> handleDelete()}>
            Delete
          </button>
          </form>
    </div>
       }  
    </div>
  )
}



      {/* {toRight && showImage && ImgElement}
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
    <button onClick={ ()=> handleDelete()}>Delete</button> */}
