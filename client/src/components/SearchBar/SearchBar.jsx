import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserList from "../UserList/UserList";
import "./SearchBar.css";

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
      <div class="wrapper">
        <div class="input-data">
          <input onChange={handleChange} required />
          <label>Search</label>
        </div>
      </div>
      <UserList users={filteredUsers} input={input} />
    </div>
  );
}
