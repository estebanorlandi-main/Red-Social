import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserList from "../UserList/UserList";

export default function SearchBar(props) {
  const users = useSelector((state) => state.users);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    if (event.target.value === "") {
      setFilteredUsers([]);
      setInput("");
    } else {
      setFilteredUsers(
        users.filter((user) => user.username.includes(event.target.value))
      );
      setInput(event.target.value);
    }
  };

  return (
    <div>
      <input onChange={handleChange} placeholder="Search..."></input>
      <UserList users={filteredUsers} input={input} />
    </div>
  );
}
