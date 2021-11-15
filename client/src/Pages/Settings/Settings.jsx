import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Settings.module.css";

function Settings(props) {
  const sections = ["profile", "theme"];
  const session = useSelector((state) => state.sessionReducer);

  const [section, setSection] = useState("");
  const handleSection = (name) => setSection(name);

  return (
    <main className={styles.container}>
      <div className={styles.left}>
        <ul>
          <li>
            <button onClick={() => handleSection("profile")}>Profile</button>
          </li>
          <li>
            <button onClick={() => handleSection("theme")}>Theme</button>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <section className={section === "profile" ? styles.show : styles.hide}>
          Profile
        </section>
        <section className={section === "theme" ? styles.show : styles.hide}>
          Theme
        </section>
      </div>
    </main>
  );
}

export default Settings;
