
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import Slider from 'react-slick';
import 'leaflet/dist/leaflet.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const getColor = (crimes) => {
  if (crimes > 100) return 'red';
  if (crimes > 50) return 'orange';
  if (crimes > 20) return 'yellow';
  return 'green';
};


const hotspots = [
  { id: 1, name: 'Connaught Place', position: [28.6345, 77.2192], crimes: 120 },
  { id: 2, name: 'Karol Bagh', position: [28.6519, 77.1904], crimes: 80 },
  { id: 3, name: 'Saket', position: [28.526, 77.217], crimes: 50 },
  { id: 4, name: 'Lajpat Nagar', position: [28.568, 77.243], crimes: 95 },
  { id: 5, name: 'Vasant Kunj', position: [28.520, 77.166], crimes: 70 },
  { id: 6, name: 'Rajouri Garden', position: [28.642, 77.124], crimes: 110 },
  { id: 7, name: 'Dwarka', position: [28.586, 77.047], crimes: 45 },
  { id: 8, name: 'Mayur Vihar', position: [28.620, 77.295], crimes: 60 },
  { id: 9, name: 'Pitampura', position: [28.695, 77.140], crimes: 85 },
  { id: 10, name: 'Chanakyapuri', position: [28.590, 77.191], crimes: 40 }
];


const facts = [
  "Do you know that 1 in 3 women have experienced physical or sexual violence?",
  "Do you know that 80% of women face harassment in public places?",
  "Do you know that the helpline number for women's safety is 1091?",
  "Do you know that reporting harassment can help raise awareness?",
  "Do you know that over 50% of women do not report harassment incidents?",
  "Do you know that self-defense classes can empower women to feel safer?",
];

const Safezones = () => {
  const [center] = useState([28.6345, 77.2192]); 
  const [selectedZone, setSelectedZone] = useState(null); 

  useEffect(() => {
  
  }, []);

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <div className="slick-arrow slick-next bg-pink-600 text-white rounded-full">➡️</div>,
    prevArrow: <div className="slick-arrow slick-prev bg-pink-600 text-white rounded-full">⬅️</div>,
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-3xl font-bold text-center text-pink-600 my-4">Safe Zones</h1>
      <div className="flex flex-1 relative">
        <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {hotspots.map((hotspot) => (
            <Circle
              key={hotspot.id}
              center={hotspot.position}
              radius={500}
              color={getColor(hotspot.crimes)}
              fillColor={getColor(hotspot.crimes)}
              fillOpacity={0.5}
              eventHandlers={{
                click: () => {
                  setSelectedZone(hotspot);
                },
              }}
            >
              <Popup>
                <b>{hotspot.name}</b><br />
                Crimes reported: {hotspot.crimes}
              </Popup>
            </Circle>
          ))}
        </MapContainer>

       
        <div className="absolute  top-1 right-4 bg-white p-4 rounded-lg shadow-md w-1/4">
          <h2 className="text-lg font-semibold mb-2">Zone Information</h2>
          {selectedZone ? (
            <div>
              <h3 className="font-bold">{selectedZone.name}</h3>
              <p>Crimes reported: {selectedZone.crimes}</p>
            </div>
          ) : (
            <p>Select a zone to see details.</p>
          )}
        </div>
      </div>

      <div className="bg-white p-4 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-2">Do You Know?</h2>
        <Slider {...settings} className="h-40">
          {facts.map((fact, index) => (
            <div key={index} className="p-6 bg-pink-100 rounded-lg text-center h-full flex items-center justify-center">
              <h3 className="font-semibold text-pink-600 text-lg">{fact}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Safezones;
