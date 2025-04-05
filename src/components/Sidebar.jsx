
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SOSButton from './Button';


const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  color: #d63e7c; /* Tailwind pink-600 color */
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: white; /* Background color set to white */
`;


const SidebarLink = styled(Link)`
  color: #d63e7c; /* Tailwind pink-600 color */
  text-decoration: none;
  font-weight: bold; /* Bolder text */
  margin: 10px 0;
  padding: 5px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    text-decoration: underline;
    background-color: rgba(255, 182, 193, 0.3); /* Light pink background on hover */
  }
`;


const LogoImage = styled.img`
  width: 150px; /* Adjust width according to your design */
  margin-bottom: 20px; /* Space between logo and links */
`;


const Sidebar = () => {
  return (
    <SidebarContainer>
      {}
      <LogoImage src="/SHAKTI.png" alt="Shakti Logo" /> 
      
     
      <SidebarLink to="/" aria-label="Home">Home</SidebarLink>
      <SidebarLink to="/rating" aria-label="Safety Ratings">Safety Ratings</SidebarLink>
      <SidebarLink to="/saferoute" aria-label="Safe Route">Safe Route</SidebarLink>
      <SidebarLink to="/police" aria-label="Police Location">Emergency Services</SidebarLink>
      <SidebarLink to="/awareness" aria-label="Awareness">Awareness</SidebarLink>
      <SOSButton />
    </SidebarContainer>
  );
};

export default Sidebar;
