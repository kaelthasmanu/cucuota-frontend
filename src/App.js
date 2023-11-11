import Signin from './Signin';
import Profile from './Profile'
import './App.css';
import SignIn from './Signin';
import ProfileAdmin from './ProfileAdmin'
import { Link, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "./utils/useAuth";

function RequireAuth(children) {
  const authed = useAuth();
  const navigate = useNavigate();

  return authed === true ? children : navigate("/");
}

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
