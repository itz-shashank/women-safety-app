import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';

const SafeRoute = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [route, setRoute] = useState([]);
    const [map, setMap] = useState(null);
    const [error, setError] = useState('');

    const fetchCoordinates = async (location) => {
        if (!location) return null;
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=59899544768c4a0a9638d2e51a98aea3`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            return data.results[0].geometry; 
        }
        return null;
    };

    const findRoute = async () => {
        const sourceCoords = await fetchCoordinates(source);
        const destinationCoords = await fetchCoordinates(destination);
        if (!sourceCoords || !destinationCoords) {
            setError('Invalid source or destination');
            return;
        }

        const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?start=${sourceCoords.lng},${sourceCoords.lat}&end=${destinationCoords.lng},${destinationCoords.lat}`, {
            headers: {
                'Authorization': '5b3ce3597851110001cf6248642ec0b973ca4e46ac5bccb1fa1a1600',
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.features && data.features.length > 0) {
            const routeCoordinates = data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
            setRoute(routeCoordinates);
            if (map) {
                map.flyTo([sourceCoords.lat, sourceCoords.lng], 13); 
            }
        } else {
            setError('No route found');
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-between p-4">
                <input
                    type="text"
                    placeholder="Source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="border border-gray-300 p-2"
                />
                <input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="border border-gray-300 p-2"
                />
                <button
                    onClick={findRoute}
                    className="bg-pink-600 text-white p-2 rounded ml-2"
                >
                    Find Route
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <MapContainer center={[28.6345, 77.2192]} zoom={12} style={{ height: '100%', width: '100%' }} whenCreated={setMap}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {route.length > 0 && (
                    <>
                        <Polyline positions={route} color="blue" />
                        <Marker position={route[0]}>
                            <Popup>Start: {source}</Popup>
                        </Marker>
                        <Marker position={route[route.length - 1]}>
                            <Popup>End: {destination}</Popup>
                        </Marker>
                    </>
                )}
            </MapContainer>
        </div>
    );
};

export default SafeRoute;
