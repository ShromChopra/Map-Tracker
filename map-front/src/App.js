

import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Auth_Front/Login';
import Signup from './Auth_Front/Signup';
import Dashboard from './Dashboard/Dashboard';
import LatestNews from './LatestNews/LatestNews';
import MapLegend from './MapLegend/MapLegend';

function EntryPage() {
  const navigate = useNavigate();
  return (
    <div className="entry-page">
      <h1>Welcome to Map Tracker</h1>
      <div className="entry-actions">
        <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
        <span style={{ margin: '0 10px' }}>or</span>
        <button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/latest-news" element={<LatestNews />} />
        <Route path="/map-legend" element={<MapLegend />} />
      </Routes>
    </Router>
  );
}

export default App;

