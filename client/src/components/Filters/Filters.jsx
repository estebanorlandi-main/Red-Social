import { useState } from "react";
import styles from "./Filters.module.css";

function Filters(props) {
  const [users, setUsers] = useState(false);

  const searchType = (e) => {
    setUsers((old) => !old);
  };

  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className={styles.container}>
      <label>
        {/* SearchBar */}
        Search
        <input onChange={handleSearch} />
      </label>

      <label>
        <input onChange={searchType} type="checkbox" checked={users} />
        {users ? "Users" : "Posts"}
      </label>

      <label>
        <input type="checkbox" />
        Likes
      </label>

      <label>
        <input type="checkbox" />
        Comments
      </label>

      <label>
        <input type="checkbox" />
        A-Z
      </label>
    </div>
  );
}

export default Filters;
