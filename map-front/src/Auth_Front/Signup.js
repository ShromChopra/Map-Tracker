import React, { useState, useEffect } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:5050/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setShowPopup(true);
        setCountdown(3);
      } else {
        setMessage(data.error || 'Registration failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

  useEffect(() => {
    let timer;
    if (showPopup && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (showPopup && countdown === 0) {
      window.location.href = '/';
    }
    return () => clearTimeout(timer);
  }, [showPopup, countdown]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #E6E6E6 0%, #B8C4C4 100%)', // Lightened
    }}>
      <div style={{
        background: '#F5F5F5', // Light card
        borderRadius: 16,
        boxShadow: '0 8px 32px rgba(44,66,63,0.10)',
        padding: '40px 32px',
        minWidth: 340,
        maxWidth: 400,
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: '2rem',
          marginBottom: 24,
          color: '#2C423F', // Contrasting text
        }}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{
              padding: '12px',
              borderRadius: 8,
              border: '1px solid #B8C4C4',
              fontSize: '1rem',
              marginBottom: 4,
              outline: 'none',
              transition: 'border 0.2s',
              background: '#E6E6E6',
              color: '#2C423F',
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              padding: '12px',
              borderRadius: 8,
              border: '1px solid #B8C4C4',
              fontSize: '1rem',
              marginBottom: 4,
              outline: 'none',
              transition: 'border 0.2s',
              background: '#E6E6E6',
              color: '#2C423F',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              padding: '12px',
              borderRadius: 8,
              border: '1px solid #B8C4C4',
              fontSize: '1rem',
              marginBottom: 4,
              outline: 'none',
              transition: 'border 0.2s',
              background: '#E6E6E6',
              color: '#2C423F',
            }}
          />
          <button
            type="submit"
            style={{
              background: 'linear-gradient(90deg, #B8C4C4 60%, #E6E6E6 100%)',
              color: '#2C423F',
              border: 'none',
              borderRadius: 8,
              padding: '12px 0',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(44,66,63,0.08)',
              cursor: 'pointer',
              marginTop: 8,
              transition: 'background 0.2s',
            }}
          >
            Sign Up
          </button>
        </form>
        {message && <p style={{ color: '#C0392B', marginTop: 16, fontWeight: 500 }}>{message}</p>}
        {showPopup && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#F5F5F5',
            border: '2px solid #B8C4C4',
            borderRadius: 16,
            padding: '2.5rem 2rem',
            zIndex: 1000,
            boxShadow: '0 8px 32px rgba(44,66,63,0.12)',
            textAlign: 'center',
          }}>
            <h3 style={{ color: '#2C423F', fontWeight: 700, fontSize: '1.4rem', marginBottom: 12 }}>Sign Up Successful!</h3>
            <p style={{ fontSize: '1.1rem', color: '#949B96' }}>Redirecting to main page in <span style={{ color: '#C0392B', fontWeight: 700 }}>{countdown}</span> seconds...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
