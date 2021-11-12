import React from "react";
import { Link } from "react-router-dom";

import { HiArrowNarrowRight } from "react-icons/hi";
import { BiCodeCurly } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";

import deco from "../../images/deco.svg";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <main className={styles.lading}>
      <section className={styles.headline__container}>
        <div className={styles.headline}>
          <p>Stay connected && Keep learning</p>
          <h1>Social Network for Developers</h1>
        </div>

        <Link className={styles.login} to="/signup">
          Join now! <HiArrowNarrowRight style={{ color: "#fff" }} />
        </Link>
      </section>
      <section className={styles.about}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <BiCodeCurly className={styles.icon} />
            <h3>Challenge</h3>
            <p>Community challenges</p>
          </div>
          <div className={styles.card}>
            <BiCodeCurly className={styles.icon} />
            <h3>hola</h3>
            <p>pqueña descripcion</p>
          </div>
          <div className={styles.card}>
            <AiFillGithub className={styles.icon} />
            <h3>hola</h3>
            <p>pqueña descripcion</p>
          </div>
        </div>
      </section>
    </main>
  );
}
