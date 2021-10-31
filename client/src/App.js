import { Route, Switch } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile.jsx";
import Signup from "./components/Signup/Signup";

import UserList from "./components/UserList/UserList";
import NavBar from "./components/NavBar/NavBar.js";

// Variables CSS
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/profile/:username"
          render={({
            match: {
              params: { username },
            },
          }) => <Profile user={username} />}
        />

        <Route path="/userlist" component={UserList} />

        <Route
          path="/test"
          render={() => {
            return <div>hola</div>;
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
