import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserList from "../UserList/UserList";
import style from "./SearchBar.module.css";
import { BiSearch } from "react-icons/bi";
import { searchUser } from "../../Redux/actions/Users";

export default function SearchBar(props) {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.usersReducer.users);

  const [input, setInput] = useState("");

  useEffect(() => dispatch(searchUser(input)), [input]);

  const handleChange = ({ target: { value } }) => {
    setInput(value);
  };

  return (
    <div>
      <div>
        <div className={style.inputData}>
          <span className={style.icon}>
            <BiSearch />
          </span>
          <input onChange={handleChange} required placeholder="Search Users" />
        </div>
      </div>
      <UserList users={users} input={input} />
    </div>
  );
}
