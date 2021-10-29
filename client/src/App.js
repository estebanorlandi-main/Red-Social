import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import NewPost from "./components/NewPost/NewPost";
import Profile from "./Pages/Profile/Profile.jsx";
<<<<<<< HEAD
import Post from "./components/Post/Post";
=======
>>>>>>> 387e454f688cd9a096db7542a802b3836c4c539f
import Signup from "./components/Signup/Signup";
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
              return <div></div>;
            }}
          />
          <Route path="/signup" component={Signup}/>
          <Route path="/newpost" component={NewPost}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
