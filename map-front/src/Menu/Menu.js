import React, { createContext } from 'react';
import { Link } from 'react-router-dom';

export const UserContext = createContext();

function Menu({ login, username, children }) {
  return (
    <UserContext.Provider value={{ login, username }}>
      <nav style={{ display: 'flex', gap: '2rem', background: '#eee', padding: '1rem', position: 'sticky', top: 0, alignItems: 'center' }}>
        <Link to="/latest-news" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Latest News</Link>
        <Link to="/map-legend" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Map Legend</Link>
        <div style={{ flex: 1 }} />
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '0.5rem 1rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Logout</button>
        </Link>
      </nav>
      {children}
    </UserContext.Provider>
  );
}

export default Menu;
