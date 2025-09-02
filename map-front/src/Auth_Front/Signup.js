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
      // Redirect to main page (assuming main page is '/')
  window.location.href = '/App.js';
    }
    return () => clearTimeout(timer);
  }, [showPopup, countdown]);

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
      {showPopup && (
        <div className="signup-popup" style={{position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', border: '1px solid #ccc', padding: '2rem', zIndex: 1000}}>
          <h3>Sign Up Successful!</h3>
          <p>Redirecting to main page in {countdown} seconds...</p>
        </div>
      )}
    </div>
  );
}

export default Signup;
