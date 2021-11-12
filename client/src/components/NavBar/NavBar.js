import { useState } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import { logOut } from "../../Redux/actions/Session.js";
import styles from "./NavBar.module.css";
import {logOutAdmin} from "../../Redux/actions/Admin.js"

import { ImHome3 } from "react-icons/im";

import { BiSupport } from "react-icons/bi";

import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

import { RiMoneyDollarCircleLine } from "react-icons/ri";

import logo from "../../images/deco.svg";

export default function Navbar(props) {
  const history = useHistory();
  const user = useSelector((store) => store.sessionReducer);
  const admin = useSelector((store) => store.adminReducer)
  const isLanding = useLocation().pathname === "/";
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const handleMenu = () => setShowMenu(!showMenu);

  const logOutAdminR = () => {
    dispatch(logOutAdmin());
    history.push("/home");
  };

  const logOutR = () => {
    dispatch(logOut());
    history.push("/home");
  };

  return (
    <header className={styles.navbar + ` ${isLanding ? styles.landing : ""}`}>
      <nav className={styles.nav}>
        <Link className={styles.brand} to="/">
          <img src={logo} width="20px" alt="" />
          Code<span>Net</span>
        </Link>

        <ul className={styles.menu}>
          <li>
            <a
              className={styles.nav__link}
              href="https://commerce.coinbase.com/checkout/e3e478da-798c-44e4-8147-aab0b7832214"
              target="_blank"
              rel="noreferrer"
            >
              <RiMoneyDollarCircleLine
                className={styles.icon}
                style={{ color: "#ff0" }}
              />
            </a>
            <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807"></script>
          </li>
          <li>
            <NavLink
              className={styles.nav__link}
              activeClassName={styles.active}
              to="/home"
            >
              <ImHome3 className={styles.icon} />
            </NavLink>
          </li>

          {/* Mostrar en cualquier pagina menos Landing page */}
          {!isLanding && (
            <>
              <li>
                <NavLink
                  className={styles.nav__link}
                  activeClassName={styles.active}
                  to="/support"
                >
                  <BiSupport className={styles.icon} />
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className={styles.right}>
          {/* Mostrar en cualquier pagina menos Landing page */}
          {!isLanding ? <SearchBar /> : ""}

          {!isLanding &&
            (user.username || admin.admin === true? (
              <div className={styles.profile__container}>
                <button onClick={handleMenu} className={styles.profile}>
                  {/*<span>{user.username}</span>*/}{" "}
                  <img src={user.image} alt="" />
                </button>
                <div
                  className={
                    `${showMenu ? styles.show : styles.hide} ` +
                    styles.profile__menu
                  }
                >
                  <Link
                    className={`${styles.nav__link}`}
                    to={`/profile/${user.username}`}
                  >
                    Profile <CgProfile />
                  </Link>

                  {admin.admin === true? <button
                    className={`${styles.link} ${styles.logout}`}
                    onClick={() => logOutAdminR()}
                  >
                    Log Out
                    <FiLogOut />
                  </button>:
                  <button
                    className={`${styles.nav__link} ${styles.logout}`}
                    onClick={() => logOutR()}
                  >
                    Log Out
                    <FiLogOut />
                  </button>}
                </div>
              </div>
            ) : (
              <NavLink
                className={styles.signup}
                activeClassName={styles.active}
                to="/login"
              >
                Log In
              </NavLink>
            ))}
        </div>
      </nav>
    </header>
  );
}
