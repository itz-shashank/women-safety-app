import React from 'react';
import axios from 'axios';

const SOSButton = () => {
  const sendAlert = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.post('http://localhost:5000/api/send-alert', {
            lat: latitude,
            lon: longitude,
          });
          alert('SOS alert sent successfully! Response: ' + response.data.message);
        } catch (error) {
          console.error('Error sending SOS alert:', error);
          alert('Failed to send SOS alert. Please try again later.');
        }
      }, (error) => {
        console.error('Error getting location:', error);
        alert('Failed to get geolocation. Please ensure location services are enabled.');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <button className="my-5 rounded-full " onClick={sendAlert} style={buttonStyle}>
      Send SOS Alert
    </button>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default SOSButton;