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
        padding: '48px 40px',
        minWidth: 340,
        textAlign: 'center',
        maxWidth: 400,
      }}>
        <h1 style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: '2.2rem',
          marginBottom: 24,
          color: '#2C423F', // Contrasting text
          letterSpacing: 1,
        }}>Welcome to <span style={{ color: '#5C6B71' }}>Map Tracker</span></h1>
        <div style={{ marginBottom: 32, color: '#829191', fontSize: '1.1rem' }}>
          Visualize and track global crime events interactively.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <button
            style={{
              background: 'linear-gradient(90deg, #B8C4C4 60%, #E6E6E6 100%)',
              color: '#2C423F',
              border: 'none',
              borderRadius: 8,
              padding: '12px 32px',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(44,66,63,0.08)',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <span style={{ color: '#949B96', fontWeight: 500 }}>or</span>
          <button
            style={{
              background: 'linear-gradient(90deg, #F5F5F5 60%, #B8C4C4 100%)',
              color: '#2C423F',
              border: 'none',
              borderRadius: 8,
              padding: '12px 32px',
              fontSize: '1.1rem',
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(44,66,63,0.08)',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
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
    </>
  );
}

export default App;

