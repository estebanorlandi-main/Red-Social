import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function SearchBar(props) {
  const users = useSelector((state) => state.users);

  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleChange = (event) => {
    setFilteredUsers(
      users.filter((user) => user.username.includes(event.target.value))
    );

    console.log(filteredUsers);
  };

  return (
    <div>
      <input onChange={handleChange} placeholder="Search..."></input>
      <p>Users founded: {filteredUsers.length}</p>
      <div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <p>{user.username}</p>)
        ) : (
          <p>No users found..</p>
        )}
      </div>
    </div>
  );
}
