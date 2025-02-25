import React, { useState } from 'react';
import Header from './components/Header';
import Map from './components/Map';  // Note the capital M
import './App.css';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSearchResult = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="App">
      <Header onSearchResult={handleSearchResult} />
      <Map selectedLocation={selectedLocation} />
    </div>
  );
}

export default App;