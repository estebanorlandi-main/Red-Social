import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Profile from "./Pages/Profile/Profile.jsx";
import Signup from "./components/Signup/Signup";

import UserList from "./components/UserList/UserList";
import NewPost from "./components/NewPost/NewPost";
import NavBar from "./components/NavBar/NavBar.js";
import { useSelector } from "react-redux";
import Post from "./components/Post/Post";

// Variables CSS
import "./App.css";

function App() {
  const posts = useSelector((state) => state.posts);

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
              return (
                <div>
                  <Post post={posts[0]} />
                  <Post post={posts[1]} />
                  <Post post={posts[2]} />
                  <Post post={posts[3]} />
                  <Post post={posts[4]} />
                  <Post post={posts[5]} />
                  <Post post={posts[6]} />
                  <Post post={posts[7]} />
                  <Post post={posts[8]} />
                  <Post post={posts[9]} />
                </div>
              );
            }}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
