import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../images/logo.svg";

import "./NavBar.css";

export default function NavBar(props) {
  const [loggedUser, setLoggedUser] = useState(true);

  return (
    <header>
      {loggedUser ? (
        <nav className="container">
          <Link to="/" className="brand">
            <img width="50" src={logo} alt="logo" />
            <h4>CodeNet</h4>
          </Link>
          <ul>
            <li>
              <Link class="link active" to="/test">
                Home
              </Link>
            </li>
            <li>
              <Link class="link active" to="/test">
                Profile
              </Link>
            </li>
            <li>
              <Link class="link active" to="/test">
                Log Out
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <label class="logo">Logo</label>
          <ul>
            <li>
              <Link class="link active" to="/test">
                Home
              </Link>
            </li>
            <li>
              <Link class="link active" to="/test">
                Login
              </Link>
            </li>
            <li>
              <Link class="link active" to="/test">
                Sign In
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
