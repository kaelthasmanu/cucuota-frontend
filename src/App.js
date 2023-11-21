import Signin from './Signin';
import Profile from './Profile'
import './App.css';
import SignIn from './Signin';
import ProfileAdmin from './ProfileAdmin'
import { Link, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/profile" element={
              <Profile/>
          } />
          <Route path="/" element={<Signin/>} />
          <Route path="/adminprofile" element={<ProfileAdmin/>} />
        </Routes>          
    </div>
  );
}

export default App;
