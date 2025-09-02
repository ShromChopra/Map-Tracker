import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Menu/Menu';
import Menu from '../Menu/Menu';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import MapMenu from '../Menu/Map_Menu';

// Helper: crime type to color
const crimeTypeColors = {
  1: '#e74c3c', // Terrorism
  2: '#0074D9', // Kidnapping
  3: '#2ECC40', // Other
  4: '#FFDC00', // Custom
  5: '#B10DC9', // Custom
};

function getCrimeColor(crimeType) {
  return crimeTypeColors[crimeType] || '#3498db';
}

function getRadius(affectedResources) {
  // Scale radius between 6 and 24
  if (!affectedResources || isNaN(affectedResources)) return 6;
  return Math.max(6, Math.min(24, affectedResources * 0.15));
}

function MapLegend() {
  const context = useContext(UserContext) || {};
  const { username, login } = context;
  const [crimeData, setCrimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(180);
  const [center, setCenter] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const countryOptions = Array.from(new Set(crimeData.map(r => r.country))).filter(Boolean);
  const filteredData = selectedCountry ? crimeData.filter(r => r.country === selectedCountry) : crimeData;

  useEffect(() => {
    fetch('http://localhost:5050/api/crime-data')
      .then(res => res.json())
      .then(data => {
        setCrimeData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Drag handlers
  const handleMouseDown = e => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY, center });
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };
  const handleMouseMove = e => {
    if (!isDragging || !dragStart) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    // Approximate conversion: 360 deg longitude = map width, 180 deg latitude = map height
    const mapWidth = window.innerWidth;
    const mapHeight = window.innerHeight * 0.8;
    const lonDelta = -(dx / mapWidth) * 360;
    const latDelta = (dy / mapHeight) * 180;
    setCenter([dragStart.center[0] + lonDelta, dragStart.center[1] + latDelta]);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <>
      <Menu login={login} username={username} />
  <div style={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        <MapMenu
          zoom={zoom}
          setZoom={setZoom}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          countryOptions={countryOptions}
        />
        <div
          style={{ flex: 1, height: '100%', marginBottom: 0, marginTop: 0, marginLeft: 0, marginRight: 0, overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={handleMouseDown}
        >
          <ComposableMap
            width={window.innerWidth}
            height={window.innerHeight}
            projectionConfig={{ scale: zoom, center }}
          >
            <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography key={geo.rsmKey} geography={geo} style={{ default: { fill: '#DDD', outline: 'none' }, hover: { fill: '#F53', outline: 'none' }, pressed: { fill: '#E42', outline: 'none' } }} />
                ))
              }
            </Geographies>
            {Array.isArray(filteredData) && filteredData.map((record, idx) => (
              <Marker key={idx} coordinates={[record.longitude, record.latitude]}>
                 <circle
                   r={getRadius(record.affected_resources)}
                   fill={getCrimeColor(record.crime_type)}
                   stroke="#fff"
                   strokeWidth={2}
                   opacity={0.5}
                 />
              </Marker>
            ))}
          </ComposableMap>
        </div>
      </div>
    </>
  );
}

export default MapLegend;
