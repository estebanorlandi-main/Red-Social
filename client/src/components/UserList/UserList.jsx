import { Link, useHistory } from "react-router-dom";
import styles from "./UserList.module.css";

import image from "../../images/userCard.svg";

function UserList(props) {
  const history = useHistory();
  let filteredUsers = props.users;

  const goTo = (page) => history.push(page);

  return filteredUsers.length && props.show ? (
    <div name={props.name} className={styles.list}>
      {filteredUsers.map((user, i) => (
        props.admin ===true?(
          <Link
          onMouseDown={() => goTo(`/profileAdmin/${user.username}`)}
          key={i}
          to={`/profileAdmin/${user.username}`}
          className={styles.user}
        >
          <img src={user.image || image} alt="" />
          <p key={user.idUser}>{user.username}</p>
        </Link>
        ):(
        <Link
          onMouseDown={() => goTo(`/profile/${user.username}`)}
          key={i}
          to={`/profile/${user.username}`}
          className={styles.user}
        >
          <img src={user.image || image} alt="" />
          <p key={user.idUser}>{user.username}</p>
        </Link>
        )
        
      ))}
    </div>
  ) : (
    <></>
  );
}

export default UserList;
