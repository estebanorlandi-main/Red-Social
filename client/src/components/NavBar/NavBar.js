import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./NavBar.module.css";

import SearchBar from "../SearchBar/SearchBar";

import Menu from "./Menu/Menu.jsx";

import logo from "../../images/deco.svg";
import UserCard from "../UserCard/UserCard";

export default function Navbar(props) {
  const isLanding = useLocation().pathname === "/";

  const user = useSelector((store) => store.sessionReducer);
  const admin = useSelector((store) => store.adminReducer);
  const isDark = useSelector((state) => state.themeReducer.theme);

  /*
  const socket = useSelector((state) => state.usersReducer.socket);
  useEffect(() => {
    if (Object.keys(socket).length) {
      socket.on("getNotification", (data) => {
        // like
        if (data.type === 1) {
          setNotifications((prev) => {
            if (
              !prev.find(
                (notif) =>
                  notif.senderName === data.senderName && notif.id === data.id
              )
            ) {
              return [data, ...prev];
            } else {
              return [...prev];
            }
          });
          // follow
        } else if (data.type === 3) {
          setNotifications((prev) => {
            if (
              !prev.find(
                (notif) =>
                  notif.senderName === data.senderName && notif.id === data.id
              )
            ) {
              return [data, ...prev];
            } else {
              return [...prev];
            }
          });
        } else {
          setNotifications((prev) => [data, ...prev]);
        }
      });
    }
  }, [socket]);

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  const handleClick = () => setOpen(!open);
  */

  const [showMenu, setShowMenu] = useState(false);
  const handleMenu = () => setShowMenu(!showMenu);

  return (
    <header
      className={`${styles.navbar} ${isLanding ? styles.landing : ""} ${
        isDark ? styles.dark : ""
      }`}
    >
      <nav className={styles.nav}>
        <div className={styles.left}>
          <Link className={styles.brand} to="/">
            <img src={logo} width="20px" alt="" />
            Code<span>Net</span>
          </Link>
          <SearchBar />
        </div>

        <ul className={styles.menu}>
          <Menu donate support home notification />
        </ul>

        <div className={styles.right}>
          {!isLanding &&
            (user.username || admin.admin === true ? (
              <div className={styles.profile__container}>
                <button onClick={handleMenu} className={styles.profile}>
                  <UserCard
                    toLeft
                    showName
                    showImage
                    user={{ username: user.username, image: user.image }}
                  />
                </button>
                <div
                  className={
                    `${showMenu ? styles.show : styles.hide} ` +
                    styles.profile__menu
                  }
                >
                  <Menu column logout profile settings />
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
