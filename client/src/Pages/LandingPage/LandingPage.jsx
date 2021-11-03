import React from "react";
import { Link } from "react-router-dom";

import deco from "../../images/deco.svg";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <div className={styles.text}>
        <h1>CodeNet</h1>
        <p>
          The most loved social <br /> network for developers
        </p>
        <Link className={styles.login} to="/login">
          Start now!
        </Link>
      </div>
      <img src={deco} alt="" />
    </div>
  );
}
// <div className={styles.draw}></div>
