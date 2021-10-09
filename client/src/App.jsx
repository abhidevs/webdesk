import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import JoinClass from "./pages/joinClass/JoinClass";
import CreateClass from "./pages/createClass/CreateClass";
import Login from "./pages/login/Login";
import Materials from "./pages/materials/Materials";
import Register from "./pages/register/Register";
import Tasks from "./pages/tasks/Tasks";
import IndividualMeterial from "./pages/individualmaterial/IndividualMeterial"
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
            <Register />
          </Route>
          <Route path="/materials/:subject">
            <Materials dept="BCA" sem="5th" />
          </Route>
          <Route path="/material">
            <IndividualMeterial />
          </Route>
          <Route path="/tasks/:subject">
            <Tasks dept="BCA" sem="5th" />
          </Route>
          <Route path="/task">
            <h1>Individual task page</h1>
          </Route>
          <Route path="/doubts/:subject">
            <h1>All doubts page</h1>
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
