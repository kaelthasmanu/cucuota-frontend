import Signin from './Signin';
import Profile from './Profile'
import './App.css';
import SignIn from './Signin';
import { Link, Routes, Route } from "react-router-dom";

const Home = () => <h1>Home (Public)</h1>;
const Pricing = () => <h1>Pricing (Public)</h1>;

const Dashboard = () => <h1>Dashboard (Private)</h1>;
const Settings = () => <h1>Settings (Private)</h1>;

const Login = () => <h1>TODO</h1>;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='signin'>
        <Routes>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/" element={<Signin/>} />
        </Routes>          
        </div>
      </header>
    </div>
  );
}

export default App;
