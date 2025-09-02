import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Menu/Menu';
import Menu from '../Menu/Menu';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import MapMenu from '../Menu/Map_Menu';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

// Helper: crime type to color
const crimeTypeColors = {
  1: '#e74c3c', // Terrorism
  2: '#0074D9', // Kidnapping
  3: '#2ECC40', // Other
  4: '#FFDC00', // Custom
  5: '#B10DC9', // Custom
};

function MapLegend() {

  const [hoveredEvent, setHoveredEvent] = useState(null);
  const hoverTimeout = React.useRef();
  const context = useContext(UserContext) || {};
  const { username, login } = context;
  const [crimeData, setCrimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(290);
  const [center, setCenter] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [hoveredCountry, setHoveredCountry] = useState('');
  const [crimeTypeMap, setCrimeTypeMap] = useState({});
  const [methodTypeMap, setMethodTypeMap] = useState({});
  const [selectedType, setSelectedType] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(true);
  const countryOptions = Array.from(new Set(crimeData.map(r => r.country))).filter(Boolean);
  // Build typeOptions and methodOptions arrays for MapMenu
  const typeOptions = Object.entries(crimeTypeMap).map(([id, name]) => ({ id, name }));
  const methodOptions = Object.entries(methodTypeMap).map(([id, name]) => ({ id, name }));

  // Filter data by selected type/method
  const filteredData = crimeData.filter(r => {
    const countryMatch = !selectedCountry || r.country === selectedCountry;
    const typeMatch = !selectedType || String(r.crime_type) === String(selectedType);
    const methodMatch = !selectedMethod || String(r.method_type) === String(selectedMethod);
    return countryMatch && typeMatch && methodMatch;
  });      

  // Helper: get average lat/lon for a country
  function getCountryCenter(country) {
    const records = crimeData.filter(r => r.country === country);
    if (!records.length) return [0, 0];
    const avgLat = records.reduce((sum, r) => sum + (parseFloat(r.latitude) || 0), 0) / records.length;
    const avgLon = records.reduce((sum, r) => sum + (parseFloat(r.longitude) || 0), 0) / records.length;
    return [avgLon, avgLat];
  }

  // When selectedCountry changes, update center and zoom
  useEffect(() => {
    if (selectedCountry) {
      setCenter(getCountryCenter(selectedCountry));
      setZoom(900);
    } else {
      setCenter([0, 0]);
      setZoom(290);
    }
  }, [selectedCountry, crimeData]);

function getCrimeColor(crimeType) {
  return crimeTypeColors[crimeType] || '#3498db';
}

function getRadius(affectedResources) {
  // Scale radius between 6 and 24
  if (!affectedResources || isNaN(affectedResources)) return 6;
  return Math.max(6, Math.min(24, affectedResources * 0.15));
}

  

  // Map data country names to map country names
  const countryMapNames = {
    'USA': 'United States of America',
    'US': 'United States of America',
    'United States': 'United States of America',
    'UK': 'United Kingdom',
    'Britain': 'United Kingdom',
    'England': 'United Kingdom',
    'Russia': 'Russian Federation',
    'Egypt': 'Egypt',
    'France': 'France',
    'Brazil': 'Brazil',
    'India': 'India',
    'China': 'China',
    'Australia': 'Australia',
    'Canada': 'Canada',
    // Add more as needed
  };

  function toMapCountryName(name) {
    if (!name) return '';
    const trimmed = name.trim();
    // Try mapping, else fallback to trimmed name
    return countryMapNames.hasOwnProperty(trimmed) ? countryMapNames[trimmed] : trimmed;
  }

  // Country event count and color scale (map data country names to map country names)
  const countryEventCounts = crimeData.reduce((acc, curr) => {
    const mapName = toMapCountryName(curr.country);
    if (mapName) {
      acc[mapName] = (acc[mapName] || 0) + 1;
    }
    return acc;
  }, {});

  function getCountryColor(count) {
    if (count > 100) return '#e74c3c'; // Red
    if (count > 50) return '#ff9800'; // Orange
    if (count > 25) return '#ffd600'; // Deep yellow
    if (count > 10) return '#fff176'; // Light yellow
    if (count > 0) return '#fffde7'; // Even lighter yellow
    return '#DDD'; // No color
  }

  useEffect(() => {
    fetch('http://localhost:5050/api/crime-data')
      .then(res => res.json())
      .then(data => {
        setCrimeData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5050/api/crime-types')
      .then(res => res.json())
      .then(data => {
        const map = {};
        data.forEach(item => { map[item.id] = item.crime_type; });
        setCrimeTypeMap(map);
      });
    fetch('http://localhost:5050/api/method-types')
      .then(res => res.json())
      .then(data => {
        const map = {};
        data.forEach(item => { map[item.id] = item.method_type; });
        setMethodTypeMap(map);
      });
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
  }, [isDragging, dragStart, handleMouseMove]);

  // State for draggable country event counts div
  const [countsPos, setCountsPos] = useState({ x: 40, y: 40 });
  const [countsDragging, setCountsDragging] = useState(false);
  const [countsDragStart, setCountsDragStart] = useState(null);

  // Mouse handlers for draggable div
  const handleCountsMouseDown = (e) => {
    setCountsDragging(true);
    setCountsDragStart({
      mouseX: e.clientX,
      mouseY: e.clientY,
      x: countsPos.x,
      y: countsPos.y,
    });
    e.stopPropagation();
  };
  useEffect(() => {
    if (!countsDragging) return;
    const handleMouseMove = (e) => {
      const dx = e.clientX - countsDragStart.mouseX;
      const dy = e.clientY - countsDragStart.mouseY;
      setCountsPos({
        x: Math.max(0, countsDragStart.x + dx),
        y: Math.max(0, countsDragStart.y + dy),
      });
    };
    const handleMouseUp = () => {
      setCountsDragging(false);
      setCountsDragStart(null);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [countsDragging, countsDragStart]);

  return (
    <>
      <Menu login={login} username={username} />
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)',
        fontFamily: 'Montserrat, sans-serif',
        position: 'relative', // Ensure absolute positioning for arrow
      }}>
        {/* Drawer Arrow Toggle */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: drawerOpen ? 110 : 0,
          transform: 'translateY(-50%)',
          zIndex: 20,
          transition: 'left 0.3s',
        }}>
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            style={{
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '0 8px 8px 0',
              boxShadow: '0 2px 8px rgba(60,60,120,0.10)',
              width: 32,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              outline: 'none',
              fontSize: 22,
              transition: 'background 0.2s',
            }}
            aria-label="Toggle menu drawer"
          >
            {drawerOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
        {/* Sidebar Drawer Animation */}
        <div style={{
          position: 'relative',
          left: drawerOpen ? 0 : -110,
          transition: 'left 0.3s',
          zIndex: 10,
          width: drawerOpen ? 110 : 0,
          minWidth: drawerOpen ? 110 : 0,
          maxWidth: drawerOpen ? 110 : 0,
          overflow: 'hidden',
        }}>
          {drawerOpen && (
            <MapMenu
              zoom={zoom}
              setZoom={setZoom}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              countryOptions={countryOptions}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              typeOptions={typeOptions}
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
              methodOptions={methodOptions}
            />
          )}
        </div>
        {/* Main Map Area */}
        <div
          style={{
            flex: 1,
            height: '100%',
            marginBottom: 0,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'width 0.3s',
            width: drawerOpen ? 'calc(100% - 110px)' : '100%',
            minWidth: drawerOpen ? 'calc(100% - 110px)' : '100%',
          }}
          onMouseDown={handleMouseDown}
        >
          {/* Debug: Print all country event counts above the map */}
          <div
            style={{
              position: 'absolute',
              top: countsPos.y,
              left: countsPos.x,
              background: 'rgba(255,255,255,0.95)',
              zIndex: 1000,
              fontSize: 13,
              maxHeight: 220,
              overflowY: 'auto',
              padding: '14px 18px',
              borderRadius: 14,
              boxShadow: '0 4px 16px rgba(60,60,120,0.10)',
              border: '1px solid #b0c4de',
              color: '#1976d2',
              fontWeight: 500,
              letterSpacing: '0.01em',
              minWidth: 220,
              cursor: countsDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
            }}
            onMouseDown={handleCountsMouseDown}
          >
            <strong style={{ fontSize: 15, color: '#1976d2', fontWeight: 700 }}>Country Event Counts</strong>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {Object.entries(countryEventCounts).map(([country, count]) => (
                <li key={country} style={{ padding: '2px 0', color: '#444', fontWeight: 500 }}>{country}: <span style={{ color: '#e74c3c', fontWeight: 700 }}>{count}</span></li>
              ))}
            </ul>
          </div>
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: 24,
            boxShadow: '0 8px 32px rgba(60,60,120,0.10)',
            background: '#1976d2', // Solid, darker blue for water/ocean
            padding: '0.5rem',
            position: 'relative',
            transition: 'box-shadow 0.2s',
            overflow: 'hidden',
          }}>
            <ComposableMap
              width={window.innerWidth}
              height={window.innerHeight}
              projectionConfig={{ scale: zoom, center }}
              onClick={() => setSelectedCountry('')}
              style={{ background: 'none' }} // Ensure SVG background is transparent
            >
              <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                {({ geographies }) =>
                  geographies.map(geo => {
                    const mapCountryName = geo.properties.NAME || geo.properties.name || '';
                    const count = countryEventCounts[mapCountryName] || 0;
                    const fillColor = getCountryColor(count);
                    // Find the original country name from crimeData for selection
                    const originalCountry = Object.keys(countryMapNames).find(key => countryMapNames[key] === mapCountryName) || mapCountryName;
                    return (
                      <g key={geo.rsmKey}>
                        <Geography
                          geography={geo}
                          style={{
                            default: {
                              fill: fillColor,
                              outline: 'none',
                              stroke: 'none',
                              strokeWidth: 0,
                              cursor: 'pointer',
                              transition: 'fill 0.2s',
                            },
                            hover: {
                              fill: fillColor,
                              outline: 'none',
                              stroke: '#1976d2',
                              strokeWidth: 3,
                              cursor: 'pointer',
                              transition: 'stroke 0.2s',
                            },
                          }}
                          onMouseEnter={() => setHoveredCountry(mapCountryName)}
                          onMouseLeave={() => setHoveredCountry('')}
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedCountry(originalCountry);
                          }}
                        />
                      </g>
                    );
                  })
                }
              </Geographies>
              {selectedCountry && Array.isArray(filteredData) && filteredData.map((record, idx) => (
                <Marker key={idx} coordinates={[record.longitude, record.latitude]}>
                  <circle
                    r={getRadius(record.affected_resources)}
                    fill={getCrimeColor(record.crime_type)}
                    stroke="#fff"
                    strokeWidth={2}
                    opacity={0.5}
                    onMouseEnter={e => {
                      setHoveredEvent(record);
                    }}
                    onMouseLeave={() => setHoveredEvent(null)}
                  />
                  {hoveredEvent && hoveredEvent.latitude === record.latitude && hoveredEvent.longitude === record.longitude && (
                    <foreignObject x={10} y={-40} width={200} height={110} style={{ pointerEvents: 'none' }}>
                      <div style={{
                        background: 'rgba(255,255,255,0.98)',
                        border: '1px solid #b0c4de',
                        borderRadius: 10,
                        padding: '12px 14px',
                        fontSize: 13,
                        boxShadow: '0 4px 16px rgba(60,60,120,0.10)',
                        color: '#1976d2',
                        fontWeight: 500,
                        minWidth: 160,
                        maxWidth: 180,
                        letterSpacing: '0.01em',
                      }}>
                        <div style={{ marginBottom: 4 }}><strong>Type:</strong> <span style={{ color: '#e74c3c' }}>{crimeTypeMap[record.crime_type] || record.crime_type}</span></div>
                        <div style={{ marginBottom: 4 }}><strong>Method:</strong> <span style={{ color: '#0074D9' }}>{methodTypeMap[record.method_type] || record.method_type}</span></div>
                        <div style={{ marginBottom: 4 }}><strong>State:</strong> <span style={{ color: '#2ECC40' }}>{record.state}</span></div>
                        <div><strong>Resources:</strong> <span style={{ color: '#B10DC9' }}>{record.affected_resources}</span></div>
                      </div>
                    </foreignObject>
                  )}
                </Marker>
              ))}
            </ComposableMap>
          </div>
        </div>
      </div>
    </>
  );
}

export default MapLegend;
