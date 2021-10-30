import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Profile from "./Pages/Profile/Profile.jsx";
import Signup from "./components/Signup/Signup";

import UserList from "./components/UserList/UserList";
import NewPost from "./components/NewPost/NewPost";
import NavBar from "./components/NavBar/NavBar.js";

function App() {
  return (
    <BrowserRouter>
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
          <Route path="/newpost" component={NewPost} />
          <Route path="/userlist" component={UserList} />

          <Route
            path="/test"
            render={() => {
              return <div></div>;
            }}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
