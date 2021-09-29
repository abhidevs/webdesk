import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Herosection from './components/herosection/Herosection';
import HomeWidget from './components/notemeterial/HomeWidget';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <h1>Welcome to WebDesk</h1> */}
      <Herosection/>
      <HomeWidget/>
    </div>
    

    
  );
}

export default App;