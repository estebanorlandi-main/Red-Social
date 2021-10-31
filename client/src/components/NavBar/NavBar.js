import { Fragment } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../../images/logo.svg";
import logoDark from "../../images/logo-dark.svg";

import styles from "./NavBar.module.css";

export default function NavBar(props) {
  const [loggedUser, setLoggedUser] = useState(false);

  const isLanding = useLocation().pathname === "/";

  return (
    <header className={styles.navbar + ` ${isLanding ? styles.landing : ""}`}>
      <nav className={"container"}>
        <Link to="/" className={styles.brand}>
          <img width="50" src={isLanding ? logoDark : logo} alt="logo" />
          <h4>
            Code<span>Net</span>
          </h4>
        </Link>
        <ul className={styles.nav}>
          <li>
            <Link class={styles.link} to="/home">
              Home
            </Link>
          </li>
          {loggedUser ? (
            <Fragment>
              <li>
                <Link className={styles.link} to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className={styles.link} to="/logout">
                  Log Out
                </Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <Link className={styles.link} to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className={styles.link} to="/signup">
                  SignUp
                </Link>
              </li>
            </Fragment>
          )}
          <li>
            <Link class={styles.link} to="/test">
              test
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
