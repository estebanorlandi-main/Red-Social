import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import NewPost from "./components/NewPost/NewPost";
import Profile from "./Pages/Profile/Profile.jsx";
import UserList from "./components/UserList/UserList";
import Signup from "./components/Signup/Signup";
import Filters from "./components/Filters/Filters";
import NavBar from "./components/NavBar/NavBar.js";
import SearchBar from "./components/SearchBar/SearchBar";
import Post from "./components/Post/Post";

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
                  <SearchBar />
                </div>
              );
            }}
          />
          <Route path="/signup" component={Signup}/>
          <Route path="/newpost" component={NewPost}/>
          <Route path="/userlist" component={UserList}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
