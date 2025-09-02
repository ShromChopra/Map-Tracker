
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '../Menu/Menu';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const login = location.state?.login;
  const username = location.state?.username;
  const [showPopup, setShowPopup] = useState(true);
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    let timer;
    if (showPopup && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (showPopup && countdown === 0) {
      setShowPopup(false);
    }
    return () => clearTimeout(timer);
  }, [showPopup, countdown]);

  if (login !== 'success' || !username) {
    return <div>Unauthorized. Please login first.</div>;
  }

  return (
    <div className="dashboard-page">
      {/* Static Navbar */}
      <Menu login={login} username={username} />

      {/* Welcome Popup */}
      {showPopup && (
        <div className="dashboard-popup" style={{position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', border: '1px solid #ccc', padding: '2rem', zIndex: 1000}}>
          <h3>Welcome {username}!</h3>
          <p>Login successful. You are now on the dashboard.</p>
          <p>Popup will close in {countdown} seconds...</p>
        </div>
      )}

      {/* Dashboard content below navbar */}
      <div style={{ marginTop: '2rem' }}>
        {/* You can add dashboard-specific content here */}
      </div>
    </div>
  );
}

export default Dashboard;
