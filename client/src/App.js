import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Post from "./components/Post/Post";
import { useSelector } from "react-redux";

function App() {
  const posts = useSelector((state) => state.posts);
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
                  <Post post={{ ...posts[0], image: undefined }} />
                  <Post post={posts[1]} />
                  <Post post={posts[2]} />
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
