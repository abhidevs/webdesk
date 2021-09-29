import './App.scss';
import Navbar from './components/Navbar/Navbar';
import Herosection from './components/herosection/Herosection';
import Notemeterial from './components/notemeterial/Notemeterial';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <h1>Welcome to WebDesk</h1> */}
      <Herosection/>
      <Notemeterial/>
    </div>
    

    
  );
}

export default App;