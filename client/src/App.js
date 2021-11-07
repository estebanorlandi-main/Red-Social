import { Route, Switch } from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile.jsx";

import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar.js";

import Messenger from "./Pages/Messenger/Messenger";
import Support from "./components/Support/Support";

import Popup from "./components/Support/SupportLocalPopUp.jsx";
// Variables CSS
import "./App.css";
import UserCard from "./components/UserCard/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { removeError } from "./Redux/actions/Errors";


// chat v.2
import Chat from "./components/Chat/Chat"

function App() {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errorsReducer);

  const handleDelete = (id) => dispatch(removeError());

  return (
    <div className="App">
      {errors && errors.length ? (
        <ul>
          {errors.map((error) => (
            <li onClick={() => handleDelete(error.id)}>{error.message}</li>
          ))}
        </ul>
      ) : (
        ""
      )}

      <NavBar />

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/support" component={Support} />


        <Route path="/chat/test" component={Chat}/>

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
