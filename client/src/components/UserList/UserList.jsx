import { Link, useHistory } from "react-router-dom";
import styles from "./UserList.module.css";

import image from "../../images/userCard.svg";
import UserCard from "../UserCard/UserCard";

function UserList(props) {
  const history = useHistory();
  let filteredUsers = props.users;

  const goTo = (page) => history.push(page);
  console.log(filteredUsers[0]);

  return filteredUsers.length && props.show ? (
    <div name={props.name} className={styles.list}>
      {filteredUsers.map((user, i) =>
        props.admin === true ? (
          <Link
            onMouseDown={() => goTo(`/profileAdmin/${user.username}`)}
            key={i}
            to={`/profileAdmin/${user.username}`}
            className={styles.user}
          >
            <UserCard
              toRight
              showImage
              showName
              user={{
                username: user.username,
                image: user.image,
              }}
            />
          </Link>
        ) : (
          <Link
            onMouseDown={() => goTo(`/profile/${user.username}`)}
            key={i}
            to={`/profile/${user.username}`}
            className={styles.user}
          >
            <UserCard
              toRight
              showImage
              showName
              user={{
                username: user.username,
                image: user.image,
              }}
            />
          </Link>
        )
      )}
    </div>
  ) : (
    <></>
  );
}

export default UserList;
