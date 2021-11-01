import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserList from "../UserList/UserList";
import style from "./SearchBar.module.css";
import { searchUser } from "../../Redux/actions/Users";
import { BiSearch } from 'react-icons/bi'

export default function SearchBar(props) {
  const users = useSelector((state) => state.usersReducer.users);
  const filteredUsers = useSelector(
    (state) => state.usersReducer.filteredUsers
  );

  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  const handleChange = (event) => {
    if (event.target.value === "") {
      dispatch(searchUser(users, event.target.value));
      setInput("");
    } else {
      dispatch(searchUser(users, event.target.value));
      // setFilteredUsers(
      //   users.filter((user) => user.username.includes(event.target.value))
      // );
      setInput(event.target.value);
    }
  };

  return (
    <div>
      <div>
        <div className={style.inputData}>
          <span className={style.icon}>
          <BiSearch />
          </span>
          <input onChange={handleChange} required 
            placeholder='Search Users'
          />
        </div>
      </div>
      <UserList users={filteredUsers} input={input} />
    </div>
  );
}
