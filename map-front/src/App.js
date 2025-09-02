

import './App.css';
import React, { useState } from 'react';
import Login from './Auth_Front/Login';
import Signup from './Auth_Front/Signup';

function App() {
  const [page, setPage] = useState('entry');

  const handleBack = () => setPage('entry');
  const handleHome = () => setPage('entry');

  if (page === 'login') {
    return (
      <div>
        <button onClick={handleHome} style={{ position: 'absolute', top: 10, left: 10 }}>Home</button>
        <button onClick={handleBack} style={{ position: 'absolute', top: 10, left: 80 }}>Back</button>
        <Login />
      </div>
    );
  }
  if (page === 'signup') {
    return (
      <div>
        <button onClick={handleHome} style={{ position: 'absolute', top: 10, left: 10 }}>Home</button>
        <button onClick={handleBack} style={{ position: 'absolute', top: 10, left: 80 }}>Back</button>
        <Signup />
      </div>
    );
  }

  return (
    <div className="entry-page">
      <h1>Welcome to Map Tracker</h1>
      <div className="entry-actions">
        <button className="login-btn" onClick={() => setPage('login')}>Login</button>
        <span style={{ margin: '0 10px' }}>or</span>
        <button className="signup-btn" onClick={() => setPage('signup')}>Sign Up</button>
      </div>
    </div>
  );
}

export default App;

