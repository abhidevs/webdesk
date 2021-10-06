import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <h1>Register page</h1>
          </Route>
          <Route path="/materials">
            <h1>All materials page</h1>
          </Route>
          <Route path="/tasks">
            <h1>All tasks page</h1>
          </Route>
          <Route path="/doubts">
            <h1>All doubts page</h1>
          </Route>
          <Route path="/material">
            <h1>Individual material page</h1>
          </Route>
          <Route path="/task">
            <h1>Individual task page</h1>
          </Route>
          <Route path="/doubt">
            <h1>Individual doubt page</h1>
          </Route>
          <Route path="/class">
            <h1>Individual class page</h1>
          </Route>
        </Switch>
      </Router>

    </div>
  );
  }

export default App;
