import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import JoinClass from "./pages/joinClass/JoinClass";
import CreateClass from "./pages/createClass/CreateClass";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <h1>Login page</h1>
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
          <Route path="/class/join">
            <JoinClass />
          </Route>
          <Route exact path="/class">
            <h1>Video call page</h1>
          </Route>
          <Route path="/class/create">
            <CreateClass />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
