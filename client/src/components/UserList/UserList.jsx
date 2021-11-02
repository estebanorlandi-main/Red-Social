import styles from "./UserList.module.css";

function UserList(props) {
  console.log(props)
  let filteredUsers = props.users
  let input = props.input
  return (
  <div>
  {filteredUsers.length ? 
  <div className={styles.list}>
    {filteredUsers.length > 0 ? (
        filteredUsers.map((user) =>
          <div className={styles.user}>
            <img src={user.avatar}/>
            <p key={user.idUser}>{user.username}</p>
          </div>
      )
      
    ) : (input === "" ? <p>Search Users</p>:
        <p>No users found..</p>
      )}
  </div>
  :
  <div></div>
  }
  </div>  
  );
}

export default UserList;
