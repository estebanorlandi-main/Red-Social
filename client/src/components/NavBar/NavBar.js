import { useState } from "react";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../images/logo.svg";
import logoDark from "../../images/logo-dark.svg";
import { logOut } from "../../Redux/actions/Session.js";
import styles from "./NavBar.module.css";

/*
import { ImHome3 } from "react-icons/im";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaLaptopCode } from "react-icons/fa";
import { GoSignIn } from "react-icons/go";
*/

import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

import { RiMoneyDollarCircleLine } from "react-icons/ri";

import newLogo from "../../images/deco.svg";
export default function Navbar(props) {
  const history = useHistory();
  const user = useSelector((store) => store.sessionReducer);
  const isLanding = useLocation().pathname === "/";
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const handleMenu = () => setShowMenu(!showMenu);

  const logOutR = () => {
    dispatch(logOut());
    history.push("/home");
  };

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
              <a
                class="donate-with-crypto"
                href="https://commerce.coinbase.com/checkout/e3e478da-798c-44e4-8147-aab0b7832214"
              >
                Donate <RiMoneyDollarCircleLine style={{ color: "#ff0" }} />
              </a>
              <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807"></script>
            </li>
            <li>
              <NavLink
                className={styles.link}
                activeClassName={styles.active}
                to="/home"
              >
                Home
              </NavLink>
            </li>

            {/* Mostrar en cualquier pagina menos Landing page */}
            {!isLanding && (
              <>
                <li>
                  <NavLink
                    className={styles.link}
                    activeClassName={styles.active}
                    to="/support"
                  >
                    Support
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Mostrar en cualquier pagina menos Landing page */}
          {!isLanding ? <SearchBar /> : ""}

          {!isLanding &&
            (user.username ? (
              <div className={styles.profile__container}>
                <button onClick={handleMenu} className={styles.profile}>
                  <span>{user.username}</span> <img src={user.image} alt="" />
                </button>
                <div
                  className={
                    `${showMenu ? styles.show : styles.hide} ` +
                    styles.profile__menu
                  }
                >
                  <Link
                    className={`${styles.link}`}
                    to={`/profile/${user.username}`}
                  >
                    Profile <CgProfile />
                  </Link>
                  <button
                    className={`${styles.link} ${styles.logout}`}
                    onClick={() => logOutR()}
                  >
                    Log Out
                    <FiLogOut />
                  </button>
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
