import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Filters from "./components/Filters/Filters";

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
                  <Filters />
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
