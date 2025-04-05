import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const policeIcon = new L.Icon({
  iconUrl: '/icon/police-station.png', 
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const PoliceStationLocator = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [policeStations, setPoliceStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(5000); 
  const [noStationsFound, setNoStationsFound] = useState(false);

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
        fetchPoliceStations(latitude, longitude, radius);
      },
      (error) => {
        setError("Error getting location: " + error.message);
        setLoading(false);
      }
    );
  }, [radius]);

  const fetchPoliceStations = async (lat, lon, searchRadius) => {
    try {
      
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=[out:json];node["amenity"="hospital"](around:${searchRadius},${lat},${lon});out;`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.elements.length === 0 && searchRadius < 20000) {
        setRadius(searchRadius + 5000); 
      } else if (data.elements.length === 0) {
        setNoStationsFound(true); 
        setPoliceStations([]);
      } else {
        const stations = data.elements.map((station) => ({
          id: station.id,
          lat: station.lat,
          lon: station.lon,
        }));
        setPoliceStations(stations);
        setNoStationsFound(false);
      }
    } catch (error) {
      setError("Failed to fetch police stations: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="map-container relative" style={{ height: '100vh' }}>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && noStationsFound && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 text-red-700 p-4 rounded shadow-lg text-center">
          <p className="font-semibold text-lg">No police stations found within a 20km radius.</p>
          <p>Please try again later or check your location settings.</p>
        </div>
      )}
      {currentLocation && (
        <MapContainer center={currentLocation} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={currentLocation}>
            <Popup>Your Location</Popup>
          </Marker>
          {policeStations.map((station) => (
            <Marker key={station.id} position={[station.lat, station.lon]} icon={policeIcon}>
              <Popup>Police Station</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default PoliceStationLocator;
