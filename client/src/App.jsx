import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Herosection from "./components/herosection/Herosection";
import HomeWidget from "./components/homeWidget/HomeWidget";
import { notesArray, tasksArray } from "./dummydata";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Herosection />

        <div className="widgets-row">
          <HomeWidget title="Notes & Materials" type="notes" data={notesArray} />
          <HomeWidget title="Tasks & Assignments" type="tasks" data={tasksArray} />
        </div>
      </div>
    </div>
  );
}

export default App;
