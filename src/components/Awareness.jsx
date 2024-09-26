
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Awareness = () => {
  return (
    <div className="container mx-auto p-8 bg-white text-pink-600">
      <h1 className="text-4xl font-bold mb-4 text-center">Awareness Campaigns</h1>
      <p className="text-lg mb-8 text-center">
        Empowering women through awareness and education is crucial for safety.
        Explore our initiatives to learn more.
      </p>

      {}
      <Carousel showArrows={true} infiniteLoop={true} className="mb-8">
        <div>
          <img src="public/safety/00000027.avif" alt="Campaign 1" />
          <p className="legend">Self-Defense Workshops</p>
        </div>
        <div>
          <img src="public/safety/Delhi-police-safety-tips-healthylife-werindia.jpg" alt="Campaign 2" />
          <p className="legend">Safe Travel Tips</p>
        </div>
        <div>
          <img src="public/safety/pepper-spray.jpg" alt="Campaign 3" />
          <p className="legend">Emergency Contact Awareness</p>
        </div>
      </Carousel>

      <h2 className="text-3xl font-bold mb-4">Educational Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-pink-100 p-4 rounded shadow-lg">
          <h3 className="text-xl font-semibold">Understanding Your Rights</h3>
          <p>Learn about your legal rights and protections available to you as a woman.</p>
        </div>
        <div className="bg-pink-100 p-4 rounded shadow-lg">
          <h3 className="text-xl font-semibold">Emergency Preparedness</h3>
          <p>Stay prepared with our comprehensive guides on emergency responses.</p>
        </div>
        <div className="bg-pink-100 p-4 rounded shadow-lg">
          <h3 className="text-xl font-semibold">Safety Apps</h3>
          <p>Discover various mobile apps that enhance your safety and security.</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-8 mb-4">Join Our Campaigns!</h2>
      <p className="mb-8 text-center">
        Get involved in our campaigns and help spread awareness. Together, we can create a safer community.
      </p>
      <div className="text-center">
        <button className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-500 transition duration-300" ><a href="/Signup">Sign Up Now</a>
          
        </button>
      </div>
    </div>
  );
};

export default Awareness;
