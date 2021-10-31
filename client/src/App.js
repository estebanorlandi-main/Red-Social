import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile.jsx";
import Signup from "./components/Signup/Signup";

import UserList from "./components/UserList/UserList";
import NewPost from "./components/NewPost/NewPost";
import NavBar from "./components/NavBar/NavBar.js";
import { useSelector } from "react-redux";
import Post from "./components/Post/Post";

// Variables CSS
import "./App.css";
import { useState, useEffect, useCallback } from "react";

function App() {
  const posts = useSelector((state) => state.posts);
  const [page, setPage] = useState(0);

  const handlePage = () => setPage(page + 1);

  const handleScroll = useCallback(function handleScroll() {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) handlePage();
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="App">
      <NavBar isLanding={isLanding} />

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
                {posts.map((post, i) =>
                  i < (page + 1) * 10 ? <Post post={post} /> : ""
                )}
              </div>
            );
          }}
        />
      </Switch>
    </div>
  );
}

export default App;
