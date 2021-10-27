import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./components/Home/Home";
<<<<<<< HEAD
import Signup from "./components/Signup/Signup";
=======
import Post from "./components/Post/Post";

>>>>>>> 0835a59c06d375ade85fce3b15e78cf30901c24c
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
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
