import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserList from "../UserList/UserList";
import "./SearchBar.css";
import { filterInput } from "../../Redux/actions/SearchBar";

export default function SearchBar(props) {
  const users = useSelector((state) => state.usersReducer.users);
  const filteredUsers = useSelector(
    (state) => state.usersReducer.filteredUsers
  );

  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  const handleChange = (event) => {
    if (event.target.value === "") {
      dispatch(filterInput(users, event.target.value));
      setInput("");
    } else {
      dispatch(filterInput(users, event.target.value));
      // setFilteredUsers(
      //   users.filter((user) => user.username.includes(event.target.value))
      // );
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
