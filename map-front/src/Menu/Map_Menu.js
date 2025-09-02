import React from 'react';

const MapMenu = ({ zoom, setZoom, selectedCountry, setSelectedCountry, countryOptions, selectedType, setSelectedType, typeOptions, selectedMethod, setSelectedMethod, methodOptions }) => (
  <div
    style={{
      position: 'sticky',
      height: '100%',
      width: '110px',
      background: '#E6E6E6', // Lightened background
      boxShadow: '0 8px 32px rgba(44,66,63,0.08)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2.5rem 0 2rem 0',
      zIndex: 10,
      overflowY: 'auto',
      borderTopRightRadius: 24,
      borderBottomRightRadius: 24,
      fontFamily: 'Montserrat, sans-serif',
    }}
  >
    <label style={{
      height: '180px',
      width: '32px',
      marginBottom: '2.2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontWeight: 600,
      color: '#2C423F', // Contrasting text
      fontSize: '1rem',
      letterSpacing: '0.01em',
    }}>
      <span style={{ marginBottom: 8, fontSize: '1rem' }}>Zoom</span>
      <input
        type="range"
        min={80}
        max={3000}
        step={1}
        value={zoom}
        onChange={e => setZoom(Number(e.target.value))}
        style={{
          writingMode: 'bt-lr',
          WebkitAppearance: 'slider-vertical',
          height: '140px',
          width: '24px',
          accentColor: '#5C6B71', // Lightened accent
          borderRadius: 8,
          background: '#B8C4C4', // Lightened
          boxShadow: '0 2px 8px rgba(44,66,63,0.06)',
        }}
      />
      <span style={{ fontSize: '0.95rem', marginTop: 8, color: '#949B96', fontWeight: 500 }}>{zoom}%</span>
    </label>
    <label style={{ fontSize: '1rem', marginBottom: '1.2rem', textAlign: 'center', color: '#2C423F', fontWeight: 600 }}>
      Country
      <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} style={{
        marginTop: '0.5rem',
        fontSize: '1rem',
        width: '90px',
        padding: '6px 8px',
        borderRadius: 8,
        border: '1px solid #B8C4C4',
        background: '#F5F5F5',
        color: '#2C423F',
        fontWeight: 500,
        boxShadow: '0 2px 8px rgba(44,66,63,0.04)',
        outline: 'none',
      }}>
        <option value="">All</option>
        {countryOptions.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
    </label>
    <label style={{ fontSize: '1rem', marginBottom: '1.2rem', textAlign: 'center', color: '#2C423F', fontWeight: 600 }}>
      Type
      <select value={selectedType} onChange={e => setSelectedType(e.target.value)} style={{
        marginTop: '0.5rem',
        fontSize: '1rem',
        width: '90px',
        padding: '6px 8px',
        borderRadius: 8,
        border: '1px solid #B8C4C4',
        background: '#F5F5F5',
        color: '#2C423F',
        fontWeight: 500,
        boxShadow: '0 2px 8px rgba(44,66,63,0.04)',
        outline: 'none',
      }}>
        <option value="">All</option>
        {typeOptions.map(type => (
          <option key={type.id} value={type.id}>{type.name}</option>
        ))}
      </select>
    </label>
    <label style={{ fontSize: '1rem', marginBottom: '1.2rem', textAlign: 'center', color: '#2C423F', fontWeight: 600 }}>
      Method
      <select value={selectedMethod} onChange={e => setSelectedMethod(e.target.value)} style={{
        marginTop: '0.5rem',
        fontSize: '1rem',
        width: '90px',
        padding: '6px 8px',
        borderRadius: 8,
        border: '1px solid #B8C4C4',
        background: '#F5F5F5',
        color: '#2C423F',
        fontWeight: 500,
        boxShadow: '0 2px 8px rgba(44,66,63,0.04)',
        outline: 'none',
      }}>
        <option value="">All</option>
        {methodOptions.map(method => (
          <option key={method.id} value={method.id}>{method.name}</option>
        ))}
      </select>
    </label>
  </div>
);

export default MapMenu;