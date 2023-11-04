import Signin from './Signin';
import Profile from './Profile'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='signin'>
          <Signin></Signin>
        </div>
      </header>
    </div>
  );
}

export default App;
