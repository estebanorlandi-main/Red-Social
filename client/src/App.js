import { Route, Switch, useLocation } from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile.jsx";

import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar.js";

import Messenger from "./Pages/Messenger/Messenger";
import Support from "./components/Support/Support";

//Admin
import AdminLogin from "./components/Admin/AdminLogin";
import AdminSupport from "./components/Admin/AdminSupport";
import HomeAdmin from "./components/Admin/HomeAdmin/HomeAdmin"
import ProfileAdmin from "./components/Admin/ProfileAdmin/ProfileAdmin"

import Popup from "./components/Support/SupportLocalPopUp.jsx";

import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx"
// Variables CSS
import "./App.css";
import UserCard from "./components/UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { removeError } from "./Redux/actions/Errors";
import { Link } from "react-router-dom";
import { BiMessageAltDetail } from "react-icons/bi";

// chat v.2
import Chat from "./components/Chat/Chat";
import Challenge from "./Pages/Challenge/Challenge";

function App() {
  const dispatch = useDispatch();

  const isLanding = useLocation().pathname === "/";

  const errors = useSelector((state) => state.errorsReducer);

  const handleDelete = (id) => dispatch(removeError());

  return (
    <div className="App">
      {errors && errors.length ? (
        <ul className="errors">
          {errors.map((error) => (
            <li className="error" onClick={() => handleDelete(error.id)}>
              {error.message}
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}

      {!isLanding && (
        <Link className="message" to="/messenger">
          <BiMessageAltDetail
            style={{ margin: "0", width: "1.5em", height: "1.5em" }}
          />
          <span>Messages</span>
        </Link>
      )}

      <NavBar />

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/support" component={Support} />
        <Route path="/loginAdmin" component={AdminLogin} />
        <Route path="/supportAdmin" component={AdminSupport} />
        <Route path="/challenge" component={Challenge} />
        <Route path="/homeAdmin" component={HomeAdmin}/>
        <Route 
          path="/profileAdmin/:username" 
          render={({
            match:{
              params: {username},
            },
          }) => <ProfileAdmin username={username}/>}
          />

        <Route exact path="/chat/test" component={Chat} />
        <Route exact path="/auth/reset-password" component={ForgetPassword} />
        <Route
          path="/profile/:username"
          render={({
            match: {
              params: { username },
            },
          }) => <Profile username={username} />}
        />

        <Route exact path="/messenger" component={Messenger} />
        <Route
          path="/test"
          render={() => {
            return <Popup />;
          }}
        />

        <Route
          path="/algo"
          render={() => {
            return <UserCard />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
