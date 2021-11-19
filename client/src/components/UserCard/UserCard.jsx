import React from "react";
import { useSelector } from "react-redux";

import styles from "./UserCard.module.css";

import image from "../../images/userCard.svg";

export default function UserCard({
  user,
  showName,
  showImage,
  toLeft,
  toRight,
  small,
  other,
}) {
  const isDark = useSelector((state) => state.themeReducer.theme);

  const ImgElement = (
    <img
      className={user.image ? "" : styles.noImage}
      src={
        user?.image
          ? `data:${user.image?.imageType};base64, ${user.image?.imageData}`
          : image
      }
      alt=""
    />
  );

  return (
    <div
      className={`${styles.container} ${small ? styles.small : ""} ${
        isDark ? styles.dark : ""
      }`}
    >
      {toRight && showImage && ImgElement}
      <div className={styles.column}>
        {showName && <span className={styles.username}>{user.username}</span>}
        {other && <span className={styles.other}>{other}</span>}
      </div>
      {toLeft && showImage && ImgElement}
    </div>
  );
}
