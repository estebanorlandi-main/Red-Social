import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./UserAdminStyles.css";
import person from "../../../images/personWithPC.png";
import userimg from "../../../images/userCard.png";

import { GoMarkGithub } from "react-icons/go";
import { GrMail } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";

export default function UserCardAdmin({ showPostForm }) {
  const user = useSelector((state) => state.adminReducer.user);
 
  let git = user.gitaccount && user.gitaccount.split("/");
  git = git && git[git.length - 1];

  return (
    <div className={styles.container}>
      {user && user.username ? (
        <>
          <img
            src="https://www.ariba.com/es/-/media/aribacom/page-images/03-ariba-network/0320000aribanetworkforsuppliers/hero_aribanetworkforsuppliers.jpg?h=650&la=es&w=1600&hash=D1D221FAADBFB2094DF74DA0168391BF004D946C"
            className={styles.cover}
            alt=""
          />

          <img
            className={styles.userImage}
            src={user.image || userimg}
            alt=""
          />

          <h3 className={styles.username}>{user.username}</h3>

          <p className={styles.about}>{user.about}</p>

          <ul className={styles.contact}>
            <li>
              <a
                href={user.gitaccount}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GoMarkGithub /> {git}
              </a>
            </li>
            <li>
              <a href={`mailto:${user.email}`}>
                <GrMail /> {user.email}
              </a>
            </li>
          </ul>

          <button className={styles.primary} onClick={showPostForm}>
            <FaPlus style={{ color: "#fff" }} /> <span>Create Post</span>
          </button>
        </>
      ) : (
        <div>
          <img
            className={styles.imageOffline}
            src={person}
            alt="Person chating in computer"
          />

          <p className={styles.description}>
            Find, connect and share with people with the same passion as you!
          </p>

          <ul className={styles.session}>
            <li>
              <Link className={styles.signup} to="/signup">
                Create a new acount
              </Link>
            </li>
            <li>
              <Link className={styles.login} to="/login">
                Enter to your account
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
