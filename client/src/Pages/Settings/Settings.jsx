import { useState } from "react";
import { useSelector } from "react-redux";

import { CgProfile } from "react-icons/cg";
import { BiAdjust } from "react-icons/bi";

import EditProfile from "./Sections/EditProfile";
import EditTheme from "./Sections/EditTheme";

import styles from "./Settings.module.css";

function Settings(props) {
  const sections = ["profile", "theme"];

  const [section, setSection] = useState(sections[0]);

  const handleSection = ({ target }) => {
    setSection(target.getAttribute("showsection"));
  };

  const isDark = useSelector((state) => state.themeReducer.theme);

  return (
    <main className={`${styles.container} ${isDark ? styles.dark : ""}`}>
      <div className={styles.left}>
        <ul>
          <li>
            <button
              className={section === "profile" ? styles.active : ""}
              showsection="profile"
              onClick={handleSection}
            >
              <CgProfile className={styles.icons} /> Profile
            </button>
          </li>
          <li>
            <button
              className={section === "theme" ? styles.active : ""}
              showsection="theme"
              onClick={handleSection}
            >
              <BiAdjust className={styles.icons} /> Theme
            </button>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <section className={section === "profile" ? styles.show : styles.hide}>
          <EditProfile />
        </section>
        <section className={section === "theme" ? styles.show : styles.hide}>
          <EditTheme />
        </section>
      </div>
    </main>
  );
}

export default Settings;
