import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(props) {
  const [loggedUser, setLoggedUser] = useState(true);

  return (
    <body>
      {loggedUser ? (
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
    </body>
  );
}
