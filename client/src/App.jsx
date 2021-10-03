import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Herosection from './components/herosection/Herosection';
import HomeWidget from './components/notemeterial/HomeWidget';
import MyCalendar from './components/calendar/MyCalendar';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <h1>Welcome to WebDesk</h1> */}
      <Herosection/>
      <HomeWidget/>
      <MyCalendar/>
    </div>
    

    
  );
}

export default App;