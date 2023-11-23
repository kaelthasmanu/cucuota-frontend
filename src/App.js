import Signin from './Signin';
import Profile from './Profile'
import './App.css';
import SignIn from './Signin';
import ProfileAdmin from './ProfileAdmin'
import { Link, Routes, Route } from "react-router-dom";
import { useNavigate, redirect } from "react-router-dom";
import { useEffect } from 'react';

function RequireAuth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.length === 0 && localStorage.getItem("username") === null && localStorage.getItem("accessToken") === null) {
      navigate("/");
    }
  }, [navigate]);

  return children;
}

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/profile" element={
            <RequireAuth>
              <Profile/>
            </RequireAuth>
          } />
          <Route path="/" element={<Signin/>} />
          
          <Route path="/adminprofile" element={
            <RequireAuth>
              <ProfileAdmin/>
            </RequireAuth>
          } />
        </Routes>          
    </div>
  );
}

export default App;
