import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Function to handle map center updates
function MapUpdater({ coordinates }) {
  const map = useMap();
  
  useEffect(() => {
    if (coordinates) {
      map.setView(coordinates, 16);
    }
  }, [coordinates, map]);

  return null;
}

function Map({ selectedLocation }) {
  const chicagoCoordinates = [41.8781, -87.6298];

  return (
    <div className="map-container">
      <MapContainer
        center={chicagoCoordinates}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectedLocation && (
          <Marker position={selectedLocation.coordinates} />
        )}
        <MapUpdater coordinates={selectedLocation?.coordinates} />
      </MapContainer>
    </div>
  );
}

export default Map;