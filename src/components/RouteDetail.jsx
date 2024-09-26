
import React from 'react';
import { useParams } from 'react-router-dom';

const RouteDetail = () => {
  const { coords } = useParams(); 
  const [latitude, longitude] = coords.split(','); 

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Route Details</h2>
      <p className="mb-2">Source Latitude: {latitude}</p>
      <p className="mb-2">Source Longitude: {longitude}</p>
      
    </div>
  );
};

export default RouteDetail;
