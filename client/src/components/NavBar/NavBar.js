import { Fragment } from "react";
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../images/logo.svg";
import logoDark from "../../images/logo-dark.svg";
import { logOut } from "../../Redux/actions/Session.js";
import styles from "./NavBar.module.css";

import { ImHome3 } from "react-icons/im";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaLaptopCode } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GoSignIn } from "react-icons/go";

import newLogo from "../../images/deco.svg";
export default function Navbar(props) {
  const isLanding = useLocation().pathname === "/";
  return (
    <header className={styles.navbar + ` ${isLanding ? styles.landing : ""}`}>
      <nav className={styles.nav}>
        <Link className={styles.brand} to="/">
          <img src={newLogo} width="20px" alt="" />
          Code<span>Net</span>
        </Link>

        <div className={styles.right}>
          <ul className={styles.menu}>
            <li>
              <NavLink
                className={styles.link}
                activeClassName={styles.active}
                to="/home"
              >
                Home
              </NavLink>
            </li>
          </ul>

          {isLanding ? "" : <SearchBar />}
        </div>
      </nav>
    </header>
  );
}

/*export default function NavBar(props) {
  const [loggedUser, setLoggedUser] = useState(false);
  const usuario = useSelector((store) => store.sessionReducer);
  const dispatch = useDispatch();
  const isLanding = useLocation().pathname === "/";

  useEffect(() => {
    if (usuario.username) {
      setLoggedUser(true);
    } else {
      setLoggedUser(false);
    }
  }, [usuario]);

  return (
    <header className={styles.navbar + ` ${isLanding ? styles.landing : ""}`}>
      {!isLanding ? (
        <nav className={"container"}>
          <Link to="/" className={styles.brand}>
            <img width="50" src={isLanding ? logoDark : logo} alt="logo" />
            <h4>
              Code<span>Net</span>
            </h4>
          </Link>

          <SearchBar />

          <ul className={styles.nav}>
            <li>
              <Link className={styles.link} to="/home">
                <div className={styles.links}>
                  <ImHome3 />
                  <span>Home</span>
                </div>
              </Link>
            </li>
            {loggedUser ? (
              <Fragment>
                <li>
                  <Link
                    className={styles.link}
                    to={`/profile/${usuario.username}`}
                  >
                    <div className={styles.links}>
                      <CgProfile />
                      <span>Profile</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} to="/home">
                    <div
                      onClick={() => dispatch(logOut())}
                      className={styles.links}
                    >
                      <BiLogOut />
                      <span>Log out</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} to={`/support`}>
                    <div className={styles.links}>
                      <span>Support</span>
                    </div>
                  </Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li>
                  <Link className={styles.link} to="/login">
                    <div className={styles.links}>
                      <BiLogIn />
                      <span>Login</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} to="/signup">
                    <div className={styles.links}>
                      <GoSignIn />
                      <span>Sign Up</span>
                    </div>
                  </Link>
                </li>
              </Fragment>
            )}
            <li>
              <Link className={styles.link} to="/test">
                <div className={styles.links}>
                  <FaLaptopCode />
                  <span>Test</span>
                </div>
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="/messenger">
                <div className={styles.links}>
                  <FaLaptopCode />
                  <span>Messenger</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={"container"}>
          <Link to="/" className={styles.brand}>
            <img width="50" src={isLanding ? logoDark : logo} alt="logo" />
            <h4>
              Code<span>Net</span>
            </h4>
          </Link>
          <ul className={styles.nav}>
            <li>
              <Link className={styles.link} to="/home">
                Home
              </Link>
            </li>
            {loggedUser ? (
              <Fragment>
                <li>
                  <Link
                    className={styles.link}
                    to={`/profile/${usuario.username}`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <span
                    className={styles.link}
                    onClick={() => dispatch(logOut())}
                  >
                    Log Out
                  </span>
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
              <Link className={styles.link} to="/test">
                test
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}*/
