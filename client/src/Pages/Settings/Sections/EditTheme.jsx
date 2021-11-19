import { useSelector, useDispatch } from "react-redux";
import { BiMoon, BiSun } from "react-icons/bi";

import { changeTheme } from "../../../Redux/actions/Theme";

import styles from "./EditTheme.module.css";

function EditTheme(props) {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.themeReducer.theme);

  const handleTheme = () => dispatch(changeTheme(!isDark));

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ""}`}>
      <h1>Theme</h1>

      <button onClick={handleTheme}>
        {isDark ? (
          <BiSun className={styles.icon} style={{ color: "#1e1e1e" }} />
        ) : (
          <BiMoon className={styles.icon} style={{ color: "#fff" }} />
        )}
        {isDark ? "light" : "dark"} mode
      </button>
    </div>
  );
}

export default EditTheme;
