import { Link } from "react-router-dom";
import styles from "./UserList.module.css";

function UserList(props) {
  let filteredUsers = props.users;
  let input = props.input;
  return (
    <div>
      {filteredUsers.length ? (
        <div className={styles.list}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, i) => (
              <Link
                key={i}
                to={`/profile/${user.username}`}
                className={styles.user}
              >
                <img src={user.avatar} alt="" />
                <p key={user.idUser}>{user.username}</p>
              </Link>
            ))
          ) : input === "" ? (
            <p>Search Users</p>
          ) : (
            <p>No users found..</p>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default UserList;
