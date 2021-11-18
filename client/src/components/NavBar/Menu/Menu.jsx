import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { logOut } from "../../../Redux/actions/Session.js";
import { logOutAdmin } from "../../../Redux/actions/Admin.js";

import { NavLink, useLocation, useHistory } from "react-router-dom";

import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiSupport, BiCog, BiHomeAlt, BiBell } from "react-icons/bi";

import Notification from "../../Notification/Notification";

import styles from "./Menu.module.css";

function Menu({
  column,
  profile,
  home,
  notification,
  support,
  donate,
  settings,
  login,
  logout,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLanding = useLocation().pathname === "/";

  const isDark = useSelector((state) => state.themeReducer.theme);
  const socket = useSelector((state) => state.usersReducer.socket);
  const user = useSelector((store) => store.sessionReducer);
  const admin = useSelector((state) => state.adminReducer.admin);

  const [open, setOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

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

  const handleClick = () => setOpen(!open);

  const logOutR = () => {
    if (admin) dispatch(logOutAdmin());
    else dispatch(logOut());
    history.push("/home");
  };

  return !isLanding ? (
    <ul
      className={`${styles.menu} ${column ? styles.column : ""} ${
        isDark ? styles.dark : ""
      }`}
    >
      {home ? (
        <li>
          {admin ? (
            <NavLink
              className={styles.menu__link}
              activeClassName={styles.active}
              to="/homeAdmin"
            >
              <BiHomeAlt className={styles.icon} />
            </NavLink>
          ) : (
            <NavLink
              className={styles.menu__link}
              activeClassName={styles.active}
              to="/home"
            >
              <BiHomeAlt className={styles.icon} />
            </NavLink>
          )}
        </li>
      ) : (
        <></>
      )}

      {notification ? (
        <li>
          <button onClick={handleClick} className={styles.menu__link}>
            <BiBell className={styles.icon} />
            {notifications.length > 0 && (
              <div className={styles.counter}>{notifications.length}</div>
            )}
            {open && (
              <div className={styles.notifications}>
                <button className={styles.markRead} onClick={handleRead}>
                  Mark as read
                </button>
                {notifications.map((notification, i) => (
                  <li key={i}>
                    <Notification notification={notification} />
                  </li>
                ))}
              </div>
            )}
          </button>
        </li>
      ) : (
        <></>
      )}
      {support ? (
        <li>
          {admin ? (
            <NavLink
              className={styles.menu__link}
              activeClassName={styles.active}
              to="/supportAdmin"
            >
              {column ? "Support" : <></>}
              <BiSupport className={styles.icon} />
            </NavLink>
          ) : (
            <NavLink
              className={styles.menu__link}
              activeClassName={styles.active}
              to="/support"
            >
              {column ? "Support" : <></>}
              <BiSupport className={styles.icon} />
            </NavLink>
          )}
        </li>
      ) : (
        <></>
      )}
      {donate ? (
        <li>
          <a
            className={styles.menu__link}
            href="https://commerce.coinbase.com/checkout/e3e478da-798c-44e4-8147-aab0b7832214"
            target="_blank"
            rel="noreferrer"
          >
            {column ? "Donate" : <></>}
            <RiMoneyDollarCircleLine
              className={styles.icon}
              style={{ color: "#ff0" }}
            />
          </a>
          <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807"></script>
        </li>
      ) : (
        <></>
      )}
      {profile ? (
        <li>
          <NavLink
            className={`${styles.menu__link}`}
            activeClassName={styles.active}
            to={`/profile/${user.username}`}
          >
            Profile <CgProfile />
          </NavLink>
        </li>
      ) : (
        <></>
      )}
      {settings ? (
        <NavLink
          className={`${styles.menu__link}`}
          activeClassName={styles.active}
          to="settings"
        >
          Settings
          <BiCog />
        </NavLink>
      ) : (
        <></>
      )}
      {logout ? (
        <button
          className={`${styles.menu__link} ${styles.logout}`}
          onClick={() => logOutR()}
        >
          Log Out
          <FiLogOut />
        </button>
      ) : (
        <></>
      )}
    </ul>
  ) : (
    <ul
      className={`${styles.menu} ${column ? styles.column : ""} ${
        isDark ? styles.dark : ""
      }`}
    >
      <li>
        {admin ? (
          <NavLink
            className={styles.menu__link}
            activeClassName={styles.active}
            to="/homeAdmin"
          >
            <BiHomeAlt className={styles.icon} />
          </NavLink>
        ) : (
          <NavLink
            className={styles.menu__link}
            activeClassName={styles.active}
            to="/home"
          >
            <BiHomeAlt className={styles.icon} />
          </NavLink>
        )}
      </li>
    </ul>
  );
}

export default Menu;
