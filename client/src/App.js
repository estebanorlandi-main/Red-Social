import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile.jsx";

import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar.js";

// Variables CSS
import "./App.css";

function App() {
  const session = useSelector((store) => store.sessionReducer);

  useEffect(() => {
    function verificar() {
      if (session.username) {
        localStorage.setItem("CodeNet", JSON.stringify(session));
      } else {
        localStorage.setItem("CodeNet", JSON.stringify({}));
      }
    }
    verificar();
  }, [session]);

  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />

        <Route
          path="/profile/:username"
          render={({
            match: {
              params: { username },
            },
          }) => <Profile username={username} />}
        />

        <Route
          path="/test"
          render={() => {
            return <div />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
