import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

import deco from "../../images/deco.svg";

export default function LandingPage() {
  const dispatch = useDispatch();

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
      <img src={deco} />
    </div>
  );
}
// <div className={styles.draw}></div>
