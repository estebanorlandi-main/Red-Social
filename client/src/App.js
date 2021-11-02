import { Route, Switch } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile.jsx";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import UserList from "./components/UserList/UserList";
import NavBar from "./components/NavBar/NavBar.js";
import { useEffect, useState } from "react";
import { SingUp } from "./Redux/actions/Profile.js";
// Variables CSS
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  const session = useSelector((store) => store.sessionReducer);
  const dispatch = useDispatch();
  const [first, setFirst] = useState(true);
  useEffect(() => {
    function verificar() {
      console.log("hola")
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

        <Route path="/userlist" component={UserList} />

        <Route
          path="/test"
          render={() => {
            return <SearchBar />;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
