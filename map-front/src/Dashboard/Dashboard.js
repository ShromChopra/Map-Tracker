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
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(120deg, #E6E6E6 0%, #B8C4C4 100%)', // Lightened
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '1.2rem',
        color: '#C0392B',
        fontWeight: 600,
      }}>
        Unauthorized. Please login first.
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #E6E6E6 0%, #B8C4C4 100%)', // Lightened
      fontFamily: 'Montserrat, sans-serif',
    }}>
      {/* Static Navbar */}
      <Menu login={login} username={username} />

      {/* Welcome Popup */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#F5F5F5', // Light card
          border: '2px solid #B8C4C4',
          borderRadius: 16,
          padding: '2.5rem 2rem',
          zIndex: 1000,
          boxShadow: '0 8px 32px rgba(44,66,63,0.12)',
          textAlign: 'center',
          minWidth: 320,
          maxWidth: 400,
        }}>
          <h3 style={{ color: '#2C423F', fontWeight: 700, fontSize: '1.5rem', marginBottom: 12 }}>Welcome {username}!</h3>
          <p style={{ fontSize: '1.1rem', color: '#949B96', marginBottom: 8 }}>Login successful. You are now on the dashboard.</p>
          <p style={{ fontSize: '1rem', color: '#B8C4C4' }}>Popup will close in <span style={{ color: '#C0392B', fontWeight: 700 }}>{countdown}</span> seconds...</p>
        </div>
      )}

      {/* Dashboard content below navbar */}
      <div style={{
        marginTop: '4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '60vh',
      }}>
        {/* You can add dashboard-specific content here */}
        <div style={{
          background: '#F5F5F5', // Light card
          borderRadius: 16,
          boxShadow: '0 4px 16px rgba(44,66,63,0.08)',
          padding: '2rem 2.5rem',
          minWidth: 320,
          maxWidth: 600,
          textAlign: 'center',
        }}>
          <h2 style={{ color: '#2C423F', fontWeight: 700, fontSize: '2rem', marginBottom: 16 }}>Dashboard</h2>
          <p style={{ fontSize: '1.1rem', color: '#000' }}>Welcome to your crime map tracker dashboard. Explore the map, filter events, and analyze crime data!</p>
          <p style={{ fontSize: '1.1rem', color: '#000' }}>This project was made by Shrom Chopra for ACLED.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
