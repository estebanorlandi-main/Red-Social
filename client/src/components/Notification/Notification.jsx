import UserCard from "../UserCard/UserCard";

import styles from "./Notification.module.css";

export default function Notification({ notification }) {
  let action;

  if (notification.type === 1) {
    action = "liked";
  } else if (notification.type === 2) {
    action = "commented";
  } else if (notification.type === 3) {
    action = "follow";
  } else {
    action = "shared";
  }

  return (
    <div className={styles.notification}>
      <UserCard
        user={{
          username: notification.senderName,
          image: {
            imageData: notification?.userImage?.imageData,
            imageType: notification?.userImage?.imageType,
          },
        }}
        showName
        showImage
        toRight
        other={
          action === "follow" ? "started following you" : `${action} your post`
        }
        small
      />
    </div>
  );
}
