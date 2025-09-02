import React, { useContext } from 'react';
import { UserContext } from '../Menu/Menu';
import Menu from '../Menu/Menu';

function LatestNews() {
  const context = useContext(UserContext) || {};
  const { username, login } = context;
  return (
    <Menu login={login} username={username}>
      <div
        style={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(120deg, #E6E6E6 0%, #B8C4C4 100%)', // Lightened
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        <div
          style={{
            background: '#5C6B71', // Lightened 4C5B61
            borderRadius: 18,
            boxShadow: '0 8px 32px rgba(44,66,63,0.10)',
            padding: '2.5rem 2.5rem',
            minWidth: 340,
            maxWidth: 600,
            textAlign: 'center',
          }}
        >
          <h2 style={{
            fontWeight: 700,
            fontSize: '2.2rem',
            marginBottom: 18,
            color: '#F5F5F5', // Light text for contrast
            letterSpacing: '0.01em',
          }}>Latest News</h2>
          <p style={{ fontSize: '1.15rem', color: '#D4D9D6', marginBottom: 18 }}>
            Welcome{username ? `, ${username}` : ''}! Here are the latest updates...
          </p>
          {/* Example news cards */}
          <div style={{
              background: 'linear-gradient(90deg, #B8C4C4 60%, #E6E6E6 100%)', // Lightened
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(44,66,63,0.06)',
              padding: '1.2rem 1.5rem',
              textAlign: 'left',
              marginBottom: 18,
            }}>
              <strong style={{ color: '#3C524F', fontSize: '1.1rem' }}>Alert System</strong>
              <div style={{ color: '#000', marginTop: 6 }}>New Web Crawler + Scrapper based Alert System coming soon!</div>
            </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{
              background: 'linear-gradient(90deg, #B8C4C4 60%, #E6E6E6 100%)',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(44,66,63,0.06)',
              padding: '1.2rem 1.5rem',
              textAlign: 'left',
            }}>
              <strong style={{ color: '#3C524F', fontSize: '1.1rem' }}>Crime Map Updated</strong>
              <div style={{ color: '#000', marginTop: 6 }}>New crime events have been added to the map. Explore the latest data and trends!</div>
            </div>
            <div style={{
              background: 'linear-gradient(90deg, #B8C4C4 60%, #E6E6E6 100%)',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(44,66,63,0.06)',
              padding: '1.2rem 1.5rem',
              textAlign: 'left',
            }}>
              <strong style={{ color: '#3C524F', fontSize: '1.1rem' }}>New Filtering Options</strong>
              <div style={{ color: '#000', marginTop: 6 }}>You can now filter crime events by type, method, and country for deeper analysis.</div>
            </div>
          </div>
        </div>
      </div>
    </Menu>
  );
}

export default LatestNews;
