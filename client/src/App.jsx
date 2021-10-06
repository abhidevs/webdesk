import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StartClass from "./pages/startclass/StartClass"
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import Materials from "./pages/materials/Materials";

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
          <Materials subject="All" dept="BCA" sem="5th" />
          </Route>
          <Route path="/materialsinds">
            <Materials subject="Data Structure" dept="BCA" sem="5th" />
          </Route>
          <Route path="/materialsinjp">
            <Materials subject="Java Programming" dept="BCA" sem="5th" />
          </Route>
          <Route path="/materialsindm">
            <Materials subject="Discrete Math" dept="BCA" sem="5th" />
          </Route>
          <Route path="/materialsinec">
            <Materials subject="English Communication" dept="BCA" sem="5th" />
          </Route>
          <Route path="/materialsinca">
            <Materials subject="Computer Architecture" dept="BCA" sem="5th" />
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
            <StartClass/>
          </Route>
          <Route exact path="/class">
            <h1>Video call page</h1>
          </Route>
          <Route path="/class/create">
            <StartClass />
          </Route>
        </Switch>
      </Router>

    </div>
  );
  }

export default App;
