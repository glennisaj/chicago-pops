import React, { useState } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import './App.css';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="App">
      <Header onLocationSelect={handleLocationSelect} />
      <Map selectedLocation={selectedLocation} />
    </div>
  );
}

export default App;