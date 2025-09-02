import React, { createContext } from 'react';
import { Link } from 'react-router-dom';

export const UserContext = createContext();

function Menu({ login, username, children }) {
  return (
    <UserContext.Provider value={{ login, username }}>
      <nav
        style={{
          display: 'flex',
          gap: '2rem',
          background: 'linear-gradient(90deg, #B8C4C4 0%, #5C6B71 100%)', // Lightened
          padding: '1.2rem 2.5rem',
          position: 'sticky',
          top: 0,
          alignItems: 'center',
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          boxShadow: '0 4px 16px rgba(44,66,63,0.08)',
          fontFamily: 'Montserrat, sans-serif',
          zIndex: 100,
        }}
      >
        <Link
          to="/latest-news"
          style={{
            textDecoration: 'none',
            color: '#2C423F', // Contrasting text
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '0.01em',
            padding: '0.5rem 1.2rem',
            borderRadius: 8,
            transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.target.style.background = '#E6E6E6')}
          onMouseOut={e => (e.target.style.background = 'none')}
        >
          Latest News
        </Link>
        <Link
          to="/map-legend"
          style={{
            textDecoration: 'none',
            color: '#2C423F',
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '0.01em',
            padding: '0.5rem 1.2rem',
            borderRadius: 8,
            transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.target.style.background = '#E6E6E6')}
          onMouseOut={e => (e.target.style.background = 'none')}
        >
          Map Legend
        </Link>
        <div style={{ flex: 1 }} />
        <span style={{ color: '#2C423F', fontWeight: 600, fontSize: '1rem', marginRight: '1.5rem', letterSpacing: '0.01em' }}>
          {username ? `Welcome, ${username}` : ''}
        </span>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button
            style={{
              padding: '0.6rem 1.3rem',
              background: '#E6E6E6',
              color: '#2C423F',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1.05rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(44,66,63,0.06)',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.target.style.background = '#B8C4C4')}
            onMouseOut={e => (e.target.style.background = '#E6E6E6')}
          >
            Logout
          </button>
        </Link>
      </nav>
      {children}
    </UserContext.Provider>
  );
}

export default Menu;
