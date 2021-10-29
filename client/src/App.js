import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Profile from "./Pages/Profile/Profile.jsx";
import Post from "./components/Post/Post";
import Signup from "./components/Signup/Signup";
import Filters from "./components/Filters/Filters";
import NavBar from "./components/NavBar/NavBar.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route
            path="/test"
            render={() => {
              return (
                <div>
                  <NavBar />
                </div>
              );
            }}
          />
          <Route path="/signup" component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
