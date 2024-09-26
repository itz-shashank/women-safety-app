// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Safezones from './components/Safezones';
import Rating from './components/Rating';
import SafeRoute from './components/Saferoute';
import PoliceLocation from './components/PoliceLocation';
import RouteDetail from './components/RouteDetail';
import AwarenessComponent from './components/Awareness';
import SignUp from './components/Signup'; 


const Home = () => <Safezones />;

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="ml-5 w-full p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rating" element={<Rating />} />
            <Route path="/saferoute" element={<SafeRoute />} /> 
            <Route path="/route/:lat,:lon" element={<RouteDetail />} />
            <Route path="/police" element={<PoliceLocation />} />
            <Route path="/awareness" element={<AwarenessComponent />} />
            <Route path="/signup" element={<SignUp />} /> 
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

