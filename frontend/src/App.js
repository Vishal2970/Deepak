import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import axios from 'axios';

// Set the base URL for Axios
axios.defaults.baseURL = 'http://localhost:5000';
function App() {
  return (
      <Router>
          <Routes>
            {/* console.log("Hit app.js"); */}
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
          </Routes>
      </Router>
  );
}
export default App;