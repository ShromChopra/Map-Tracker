import React from 'react';

const MapMenu = ({ zoom, setZoom, selectedCountry, setSelectedCountry, countryOptions }) => (
  <div
    style={{
      position: 'sticky',
      height: '100%',
      width: '80px',
      background: 'rgba(255,255,255,0.95)',
      boxShadow: '0 0 8px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem 0',
      zIndex: 10,
      overflowY: 'auto'
    }}
  >
    <label style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical', height: '180px', width: '24px', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        type="range"
        min={80}
        max={3000}
        step={1}
        value={zoom}
        onChange={e => setZoom(Number(e.target.value))}
        style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical', height: '180px', width: '24px' }}
      />
      <span style={{ fontSize: '0.9rem', marginTop: 8 }}>{zoom}</span>
    </label>
    <label style={{ fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' }}>
      Country
      <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} style={{ marginTop: '0.5rem', fontSize: '1rem', width: '70px' }}>
        <option value="">All</option>
        {countryOptions.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
    </label>
  </div>
);

export default MapMenu;