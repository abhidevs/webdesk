import { useContext } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import JoinClass from "./pages/joinClass/JoinClass";
import CreateClass from "./pages/createClass/CreateClass";
import Login from "./pages/login/Login";
import Materials from "./pages/materials/Materials";
import Register from "./pages/register/Register";
import Tasks from "./pages/tasks/Tasks";
import Onlinemeet from "./pages/onlinemeet/Onlinemeet";
import IndividualMeterial from "./pages/individualMaterial/IndividualMeterial";
import IndividualTask from "./pages/individualTask/IndividualTask";
import Doubts from "./pages/doubts/Doubts";
import IndividualDoubt from "./pages/individualDoubt/IndividualDoubt";
import { AuthContext } from "./context/authContext/AuthContext";
import UserUpdate from "./pages/userUpdate/userUpdate"
function App() {
  const { user, isFetching } = useContext(AuthContext);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/register" />}
          </Route>
          <Route path="/login">
            {!user ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route path="/register">
            {!user ? <Register /> : <Redirect to="/" />}
          </Route>

          {user || isFetching ? (
            <>
              <Route path="/materials/:subject">
                <Materials dept="BCA" sem="5th" />
              </Route>
              <Route path="/material/:id">
                <IndividualMeterial />
              </Route>
              <Route path="/tasks/:subject">
                <Tasks dept="BCA" sem="5th" />
              </Route>
              <Route path="/task/:id">
                <IndividualTask />
              </Route>
              <Route path="/doubts/:subject">
                <Doubts dept="BCA" sem="5th" />
              </Route>
              <Route path="/doubt/:id">
                <IndividualDoubt />
              </Route>
              <Route exact path="/class/join/:classId">
                <JoinClass />
              </Route>
              <Route exact path="/class/:classId">
                <Onlinemeet />
              </Route>
              <Route path="/createclass">
                <CreateClass />
              </Route>
              <Route path="/userupdate">
                <UserUpdate />
              </Route>
            </>
          ) : (
            <Redirect to="/register" />
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
