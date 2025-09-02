import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:5050/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard', { state: { login: 'success', username } });
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
  };

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
        }}>Login</h2>
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
            Login
          </button>
        </form>
        {message && <p style={{ color: '#C0392B', marginTop: 16, fontWeight: 500 }}>{message}</p>}
      </div>
      <div style={{
        position: 'fixed',
        right: 18,
        bottom: 12,
        color: '#949B96',
        fontSize: '1rem',
        fontFamily: 'Montserrat, sans-serif',
        opacity: 0.7,
        zIndex: 9999,
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '0.04em',
      }}>
        Shrom Chopra - ACLED
      </div>
    </div>
  );
}

export default Login;
