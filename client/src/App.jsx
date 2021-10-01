import "./App.scss";
import Navbar from "./components/navbar/Navbar";
import Herosection from "./components/herosection/Herosection";
import HomeWidget from "./components/homeWidget/HomeWidget";
import { classesArray, doubtsArray, notesArray, tasksArray } from "./dummydata";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Herosection />

        <div className="widgets-row">
          <HomeWidget title="Notes & Materials" type="notes" data={notesArray} forLargeItems />
          <HomeWidget title="Tasks & Assignments" type="tasks" data={tasksArray} forLargeItems />
        </div>

        <div className="widgets-row">
          <HomeWidget title="Class Schedule" type="schedules" data={classesArray} forSmallItems />
          <HomeWidget title="Doubts & Questions" type="doubts" data={doubtsArray} forSmallItems />
        </div>
      </div>
    </div>
  );
}

export default App;
